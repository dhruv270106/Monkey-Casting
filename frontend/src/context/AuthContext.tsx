'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { User } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'

interface AuthContextType {
    user: User | null
    profile: any | null
    loading: boolean
    signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    profile: null,
    loading: true,
    signOut: async () => { },
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const [profile, setProfile] = useState<any | null>(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        let mounted = true

        async function initializeAuth() {
            try {
                // 1. Get initial session
                const { data: { session } } = await supabase.auth.getSession()

                if (mounted) {
                    if (session?.user) {
                        setUser(session.user)
                        await fetchProfile(session.user.id)
                    } else {
                        setUser(null)
                        setProfile(null)
                        setLoading(false)
                    }
                }

                // 2. Listen for changes
                const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
                    console.log('Auth State Change:', event)

                    if (!mounted) return

                    if (event === 'SIGNED_OUT') {
                        setUser(null)
                        setProfile(null)
                        setLoading(false)
                        router.push('/login')
                    } else if (session?.user) {
                        setUser(session.user)
                        // Only fetch profile if user ID changed or we don't have it
                        // But simplest is to just fetch to be safe/sync
                        if (event === 'SIGNED_IN' || event === 'INITIAL_SESSION') {
                            await fetchProfile(session.user.id)
                        }
                    }
                    // Note: session can be null on TOKEN_REFRESHED error etc, but usually SIGNED_OUT handles explicit logout
                })

                return () => {
                    mounted = false
                    subscription.unsubscribe()
                }
            } catch (error) {
                console.error("Auth init error:", error)
                if (mounted) setLoading(false)
            }
        }

        initializeAuth()
    }, [])

    const fetchProfile = async (userId: string) => {
        try {
            const { data, error } = await supabase
                .from('users')
                .select('*')
                .eq('id', userId)
                .single()

            if (error) {
                // If row not found (PGRST116), try to self-heal by inserting user
                if (error.code === 'PGRST116') {
                    console.warn('Profile missing in public.users, attempting self-heal...')
                    const { data: { session } } = await supabase.auth.getSession()
                    if (session?.user) {
                        const { error: insertError } = await supabase.from('users').insert({
                            id: session.user.id,
                            email: session.user.email,
                            role: 'talent' // Default role
                        })

                        if (!insertError) {
                            // Retry fetch
                            const { data: retryData } = await supabase.from('users').select('*').eq('id', userId).single()
                            if (retryData) {
                                setProfile(retryData)
                                return // specific return not strictly needed but good flow
                            }
                        } else {
                            console.error('Failed to create missing public user record:', insertError)
                            if (typeof insertError === 'object' && insertError !== null) {
                                console.error('Insert Error Details:', JSON.stringify(insertError, null, 2));
                            }
                        }
                    }
                } else {
                    console.error('Error fetching profile:', error.message, error)
                }
            } else {
                setProfile(data)
                // Force Password Change Check
                if (data.must_change_password && window.location.pathname !== '/change-password') {
                    router.push('/change-password')
                }
            }
        } catch (err) {
            console.error('Error in fetchProfile:', err)
        } finally {
            setLoading(false)
        }
    }

    const signOut = async () => {
        await supabase.auth.signOut()
        router.push('/login')
    }

    return (
        <AuthContext.Provider value={{ user, profile, loading, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
