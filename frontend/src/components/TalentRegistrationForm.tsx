
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import styles from './TalentRegistrationForm.module.css'
import Link from 'next/link'

// Categories from requirements
const CATEGORIES = [
    "Actor / Model / Anchor",
    "Makeup Artist",
    "Stylist",
    "Art Direction",
    "Photographer / Videographer",
    "Video Editor",
    "Internship (Acting / Modeling / Anchoring)",
    "Props Renting",
    "Studio Renting",
    "Set Designer"
]

const CHARGE_OPTIONS = [
    "Per Day",
    "Per Reel",
    "Per Event",
    "Per Project"
]

export default function TalentRegistrationForm() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [selectedCategory, setSelectedCategory] = useState<string>("")

    // Common State
    const [commonData, setCommonData] = useState({
        email: '',
        password: '',
        fullName: '',
        whatsappNumber: '',
        currentCity: '',
        workLinks: '', // Google Drive / Insta / etc
        workedWithBrands: '', // "Yes" / "No" or details? Prompt asks: "Have you worked...?" -> Yes/No or details. I'll make it Text or Radio.
        // "Have you worked with any brands... before?" -> Likely Yes/No + details. I'll use a textarea or input.
        // Actually, prompt just lists it. I'll assume text input for flexibility.
        agencyStatus: '', // Independent / Agency
        charges: '',
        chargeType: 'Per Day',
        travelSurat: 'Yes', // Radio: Yes/No
        termsAccepted: false,
        emergencyContact: ''
    })

    // Dynamic State - simplified as a single object we update
    const [categoryData, setCategoryData] = useState<Record<string, any>>({})

    const handleCommonChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setCommonData(prev => ({ ...prev, [name]: value }))
    }

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCommonData(prev => ({ ...prev, termsAccepted: e.target.checked }))
    }

    const handleCategoryChange = (val: string) => {
        setSelectedCategory(val)
        setCategoryData({}) // Reset specific data on category change
    }

    const handleDynamicChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setCategoryData(prev => ({ ...prev, [name]: value }))
    }

    const handleDynamicCheckbox = (name: string, checked: boolean) => {
        setCategoryData(prev => ({ ...prev, [name]: checked }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        setLoading(true)

        try {
            if (!commonData.termsAccepted) {
                throw new Error("You must accept the terms and conditions.")
            }
            if (!selectedCategory) {
                throw new Error("Please select a category.")
            }

            // 1. Sign Up User
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email: commonData.email,
                password: commonData.password,
                options: {
                    data: {
                        full_name: commonData.fullName,
                    }
                }
            })

            if (authError) throw authError
            if (!authData.user) throw new Error("Registration failed.")

            // 2. Insert into Users table
            const { error: userError } = await supabase
                .from('users')
                .insert({
                    id: authData.user.id,
                    name: commonData.fullName,
                    email: commonData.email,
                    mobile: commonData.whatsappNumber, // Use whatsapp as primary mobile for uniqueness check implies we trust it
                    role: 'user'
                })

            if (userError) {
                // Ignore duplicate key error if user exists in public.users but just signed up (rare edge case of sync issues)
                if (!userError.message.includes('duplicate key')) {
                    console.error("User DB Error:", userError)
                    throw new Error("Failed to create user profile.")
                }
            }

            // 3. Prepare Talent Data
            // Map common fields to schema columns where possible
            const profilePayload = {
                user_id: authData.user.id,
                category: selectedCategory,
                whatsapp_number: commonData.whatsappNumber,
                city: commonData.currentCity, // Using city col for Current Location
                portfolio_links: [commonData.workLinks], // Store as array
                past_brand_work: commonData.workedWithBrands,
                agency_status: commonData.agencyStatus,
                pay_rates: `${commonData.charges} ${commonData.chargeType}`,
                travel_surat: commonData.travelSurat === 'Yes',
                content_rights_agreed: commonData.termsAccepted,
                emergency_contact: commonData.emergencyContact,

                // Map some specific fields if they match columns
                age: categoryData.age ? parseInt(categoryData.age) : null,
                bio: categoryData.bio || '',
                skills: categoryData.skills ? categoryData.skills.split(',').map((s: string) => s.trim()) : [],
                languages: categoryData.languages ? categoryData.languages.split(',').map((s: string) => s.trim()) : [],

                // Store EVERYTHING (including mapped ones for backup) in custom_fields
                custom_fields: categoryData
            }

            const { error: profileError } = await supabase
                .from('talent_profiles')
                .insert(profilePayload)

            if (profileError) {
                console.error("Profile Error:", profileError)
                throw new Error("Failed to save talent details: " + profileError.message)
            }

            // Success
            router.push('/login?registered=true')

        } catch (err: any) {
            setError(err.message || 'Something went wrong.')
            setLoading(false)
        }
    }

    return (
        <div className={styles.container}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className={styles.title}>Talent Registration</h1>
                <p className={styles.subtitle}>Join our exclusive network of creative professionals</p>

                {error && <div className={styles.globalError}>{error}</div>}

                <form onSubmit={handleSubmit}>

                    {/* SECTION: Common Fields */}
                    <div className={styles.sectionTitle}>Basic Information</div>
                    <div className={styles.grid}>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Full Name *</label>
                            <input type="text" name="fullName" className={styles.input} required value={commonData.fullName} onChange={handleCommonChange} />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Email Address *</label>
                            <input type="email" name="email" className={styles.input} required value={commonData.email} onChange={handleCommonChange} />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Create Password *</label>
                            <input type="password" name="password" className={styles.input} required value={commonData.password} onChange={handleCommonChange} placeholder="Min 6 characters" />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>WhatsApp Number *</label>
                            <input type="tel" name="whatsappNumber" className={styles.input} required value={commonData.whatsappNumber} onChange={handleCommonChange} placeholder="+91 9999999999" />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Current City / Location *</label>
                            <input type="text" name="currentCity" className={styles.input} required value={commonData.currentCity} onChange={handleCommonChange} placeholder="e.g. Mumbai, Andheri West" />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Emergency Contact (Optional)</label>
                            <input type="tel" name="emergencyContact" className={styles.input} value={commonData.emergencyContact} onChange={handleCommonChange} />
                        </div>
                    </div>

                    <div className={styles.formGroup} style={{ marginTop: '1.5rem' }}>
                        <label className={styles.label}>Relevant Work Links *</label>
                        <textarea
                            name="workLinks"
                            className={styles.textarea}
                            rows={3}
                            required
                            value={commonData.workLinks}
                            onChange={handleCommonChange}
                            placeholder="Paste links to your Instagram, YouTube, Website, or Google Drive (Ensure View Access is ON)"
                        />
                    </div>

                    <div className={styles.grid} style={{ marginTop: '1.5rem' }}>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Worked with brands/agencies before? *</label>
                            <input type="text" name="workedWithBrands" className={styles.input} required value={commonData.workedWithBrands} onChange={handleCommonChange} placeholder="Yes/No (If yes, name a few)" />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Do you work independently? *</label>
                            <select name="agencyStatus" className={styles.select} required value={commonData.agencyStatus} onChange={handleCommonChange}>
                                <option value="">Select Status</option>
                                <option value="Independent">I work Independently</option>
                                <option value="Agency">I have an exclusive agency contract</option>
                            </select>
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Charges *</label>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <input type="text" name="charges" className={styles.input} required value={commonData.charges} onChange={handleCommonChange} placeholder="Amount (e.g. 5000)" style={{ flex: 1 }} />
                                <select name="chargeType" className={styles.select} value={commonData.chargeType} onChange={handleCommonChange} style={{ width: '120px' }}>
                                    {CHARGE_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                </select>
                            </div>
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Can you travel to Surat? *</label>
                            <select name="travelSurat" className={styles.select} required value={commonData.travelSurat} onChange={handleCommonChange}>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                                <option value="Maybe">Depends on Project</option>
                            </select>
                        </div>
                    </div>

                    {/* SECTION: Category Selector */}
                    <div className={styles.sectionTitle}>Select Your Category</div>
                    <div className={styles.categoryGrid}>
                        {CATEGORIES.map(cat => (
                            <div
                                key={cat}
                                className={`${styles.categoryCard} ${selectedCategory === cat ? styles.selected : ''}`}
                                onClick={() => handleCategoryChange(cat)}
                            >
                                {cat}
                            </div>
                        ))}
                    </div>

                    {/* SECTION: Dynamic Fields */}
                    <AnimatePresence mode="wait">
                        {selectedCategory && (
                            <motion.div
                                key={selectedCategory}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className={styles.sectionTitle}>{selectedCategory} Details</div>
                                <div className={styles.grid}>

                                    {/* Actor / Model / Anchor */}
                                    {selectedCategory === "Actor / Model / Anchor" && (
                                        <>
                                            <Field type="number" name="age" label="Age" required onChange={handleDynamicChange} />
                                            <Field type="date" name="dob" label="Date of Birth" required onChange={handleDynamicChange} />
                                            <Field type="text" name="height" label="Height" required onChange={handleDynamicChange} placeholder="e.g. 5'10" />
                                            <Field type="text" name="weight" label="Weight" required onChange={handleDynamicChange} placeholder="e.g. 70kg" />
                                            <Field type="text" name="languages" label="Languages Known" required onChange={handleDynamicChange} placeholder="e.g. Hindi, English, Gujarati" />
                                            <Field type="url" name="socialProfile" label="Instagram / Social Profile" required onChange={handleDynamicChange} placeholder="Full URL (Personal)" />
                                            <Field type="url" name="videoProfile" label="Video Profile Link" required onChange={handleDynamicChange} placeholder="YouTube/Drive Link (Intro/Audition)" />
                                            <Field type="textarea" name="workExperience" label="Work Experience" required onChange={handleDynamicChange} />
                                            <Field type="text" name="projectTypes" label="Preferred Project Types" required onChange={handleDynamicChange} placeholder="e.g. Ads, Movies, Serials" />
                                            <Field type="text" name="skills" label="Skills" required onChange={handleDynamicChange} placeholder="Acting, Dancing, Swimming..." />
                                            <Field type="textarea" name="bio" label="Bio" fullWidth required onChange={handleDynamicChange} />
                                        </>
                                    )}

                                    {/* Makeup Artist */}
                                    {selectedCategory === "Makeup Artist" && (
                                        <>
                                            <Field type="number" name="age" label="Age" required onChange={handleDynamicChange} />
                                            <Field type="url" name="socialProfile" label="Personal Instagram / Social Profile" required onChange={handleDynamicChange} />
                                            <Field type="text" name="workExperience" label="Work Experience (Years)" required onChange={handleDynamicChange} />
                                            <Field type="select" name="indoorOutdoor" label="Comfortable with Indoor & Outdoor?" options={["Yes", "No", "Indoor Only", "Outdoor Only"]} required onChange={handleDynamicChange} />
                                            <Field type="select" name="maleFemaleMakeup" label="Makeup for Male & Female?" options={["Both", "Female Only", "Male Only"]} required onChange={handleDynamicChange} />
                                            <Field type="select" name="hairStyling" label="Do you provide Hair Styling?" options={["Yes", "No", "Basic Only"]} required onChange={handleDynamicChange} />
                                            <Field type="textarea" name="bio" label="Bio" fullWidth required onChange={handleDynamicChange} />
                                        </>
                                    )}

                                    {/* Stylist */}
                                    {selectedCategory === "Stylist" && (
                                        <>
                                            <Field type="number" name="age" label="Age" required onChange={handleDynamicChange} />
                                            <Field type="text" name="weight" label="Weight" required onChange={handleDynamicChange} />
                                            <Field type="text" name="languages" label="Languages Known" required onChange={handleDynamicChange} />
                                            <Field type="url" name="socialProfile" label="Personal Instagram / Social Profile" required onChange={handleDynamicChange} />
                                            <Field type="textarea" name="workExperience" label="Work Experience" required onChange={handleDynamicChange} />
                                            <Field type="text" name="projectTypes" label="Project Types" required onChange={handleDynamicChange} />
                                            <Field type="text" name="skills" label="Skills" required onChange={handleDynamicChange} />
                                            <Field type="textarea" name="bio" label="Bio" fullWidth required onChange={handleDynamicChange} />
                                        </>
                                    )}

                                    {/* Art Direction */}
                                    {selectedCategory === "Art Direction" && (
                                        <>
                                            <Field type="number" name="age" label="Age" required onChange={handleDynamicChange} />
                                            <Field type="text" name="languages" label="Languages Known" required onChange={handleDynamicChange} />
                                            <Field type="url" name="socialProfile" label="Personal Instagram / Social Profile" required onChange={handleDynamicChange} />
                                            <Field type="textarea" name="workExperience" label="Work Experience" required onChange={handleDynamicChange} />
                                            <Field type="text" name="projectTypes" label="Project Types" required onChange={handleDynamicChange} />
                                            <Field type="select" name="studioLocation" label="Both Studio & On-Location?" options={["Yes", "No"]} required onChange={handleDynamicChange} />
                                            <Field type="textarea" name="lastMinuteChanges" label="How do you manage last-minute changes?" fullWidth required onChange={handleDynamicChange} />
                                            <Field type="select" name="sketches" label="Provide Concept Sketches/Moodboards?" options={["Yes", "No"]} required onChange={handleDynamicChange} />
                                        </>
                                    )}

                                    {/* Photographer / Videographer */}
                                    {selectedCategory === "Photographer / Videographer" && (
                                        <>
                                            <Field type="number" name="age" label="Age" required onChange={handleDynamicChange} />
                                            <Field type="date" name="dob" label="Date of Birth" required onChange={handleDynamicChange} />
                                            <Field type="text" name="languages" label="Languages Known" required onChange={handleDynamicChange} />
                                            <Field type="url" name="socialProfile" label="Personal Instagram / Social Profile" required onChange={handleDynamicChange} />
                                            <Field type="textarea" name="workExperience" label="Work Experience" required onChange={handleDynamicChange} />
                                            <Field type="text" name="projectTypes" label="Project Types" required onChange={handleDynamicChange} />
                                            <Field type="text" name="skills" label="Skills" required onChange={handleDynamicChange} />
                                            <Field type="textarea" name="bio" label="Bio" fullWidth required onChange={handleDynamicChange} />
                                        </>
                                    )}

                                    {/* Video Editor */}
                                    {selectedCategory === "Video Editor" && (
                                        <>
                                            <Field type="date" name="dob" label="Date of Birth" required onChange={handleDynamicChange} />
                                            <Field type="url" name="socialProfile" label="Personal Instagram / Social Profile" required onChange={handleDynamicChange} />
                                            <Field type="textarea" name="workExperience" label="Work Experience" required onChange={handleDynamicChange} />
                                            <Field type="text" name="projectTypes" label="Project Types" required onChange={handleDynamicChange} />
                                            <Field type="textarea" name="bio" label="Bio" fullWidth required onChange={handleDynamicChange} />
                                        </>
                                    )}

                                    {/* Internship */}
                                    {selectedCategory === "Internship (Acting / Modeling / Anchoring)" && (
                                        <>
                                            <Field type="number" name="age" label="Age" required onChange={handleDynamicChange} />
                                            <Field type="date" name="dob" label="Date of Birth" required onChange={handleDynamicChange} />
                                            <Field type="text" name="languages" label="Languages Known" required onChange={handleDynamicChange} />
                                            <Field type="url" name="socialProfile" label="Personal Instagram / Social Profile" required onChange={handleDynamicChange} />
                                            <Field type="textarea" name="workExperience" label="Work Experience" required onChange={handleDynamicChange} />
                                            <Field type="text" name="projectTypes" label="Project Types" required onChange={handleDynamicChange} />
                                            <Field type="text" name="skills" label="Skills" required onChange={handleDynamicChange} />
                                            <Field type="textarea" name="bio" label="Bio" fullWidth required onChange={handleDynamicChange} />
                                        </>
                                    )}

                                    {/* Props Renting */}
                                    {selectedCategory === "Props Renting" && (
                                        <>
                                            <Field type="select" name="ownInventory" label="Have your own inventory?" options={["Yes", "No"]} required onChange={handleDynamicChange} />
                                            <Field type="textarea" name="propTypes" label="Types of props provided" required onChange={handleDynamicChange} />
                                            <Field type="text" name="styles" label="Styles/Themes available" required onChange={handleDynamicChange} />
                                            <Field type="select" name="delivery" label="Do you deliver?" options={["Yes", "No"]} required onChange={handleDynamicChange} />
                                            <Field type="select" name="maintenance" label="Maintained in shoot-ready condition?" options={["Yes", "No"]} required onChange={handleDynamicChange} />
                                            <Field type="text" name="rentalCharges" label="Rental Charges Details" required onChange={handleDynamicChange} />
                                            <Field type="select" name="setupPickup" label="Provide Setup & Pick-up?" options={["Yes", "No"]} required onChange={handleDynamicChange} />
                                        </>
                                    )}

                                    {/* Studio Renting */}
                                    {selectedCategory === "Studio Renting" && (
                                        <>
                                            <Field type="number" name="experienceYears" label="Years renting out studios" required onChange={handleDynamicChange} />
                                            <Field type="text" name="studioType" label="Type of Studio" required onChange={handleDynamicChange} />
                                            <Field type="text" name="studioSize" label="Studio Area / Size" required onChange={handleDynamicChange} />
                                            <Field type="select" name="equipIncluded" label="Lighting/Props Included?" options={["Yes", "No", "Partial"]} required onChange={handleDynamicChange} />
                                            <Field type="text" name="rentalCharges" label="Rental Charges (Day/Hour)" required onChange={handleDynamicChange} />
                                            <Field type="select" name="parking" label="Parking Access?" options={["Yes", "No"]} required onChange={handleDynamicChange} />
                                            <Field type="select" name="acPower" label="AC & Power Backup?" options={["Yes", "No"]} required onChange={handleDynamicChange} />
                                            <Field type="select" name="foodAllowed" label="Food/Makeup Setup Allowed?" options={["Yes", "No"]} required onChange={handleDynamicChange} />
                                            <Field type="select" name="customSetups" label="Open to Custom Setups?" options={["Yes", "No"]} required onChange={handleDynamicChange} />
                                        </>
                                    )}

                                    {/* Set Designer */}
                                    {selectedCategory === "Set Designer" && (
                                        <>
                                            <Field type="number" name="experienceYears" label="Years of Experience" required onChange={handleDynamicChange} />
                                            <Field type="select" name="handleProps" label="Handle Props/Decor?" options={["Yes", "No"]} required onChange={handleDynamicChange} />
                                            <Field type="select" name="indoorOutdoor" label="Comfortable Indoor & Outdoor?" options={["Yes", "No"]} required onChange={handleDynamicChange} />
                                            <Field type="select" name="provideSketches" label="Provide 3D Sketches/Concepts?" options={["Yes", "No"]} required onChange={handleDynamicChange} />
                                            <Field type="select" name="budgetWork" label="Can work within given budget?" options={["Yes", "No"]} required onChange={handleDynamicChange} />
                                            <Field type="select" name="installDismantle" label="Handle Installation & Dismantling?" options={["Yes", "No"]} required onChange={handleDynamicChange} />
                                            <Field type="select" name="collaboration" label="Collaborate with team?" options={["Yes", "No"]} required onChange={handleDynamicChange} />
                                            <Field type="text" name="dayCharge" label="Per-day Charge" required onChange={handleDynamicChange} />
                                        </>
                                    )}

                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Terms Checkbox */}
                    <div className={styles.checkboxGroup} style={{ marginTop: '2rem' }}>
                        <input type="checkbox" id="terms" className={styles.checkbox} checked={commonData.termsAccepted} onChange={handleCheckboxChange} />
                        <label htmlFor="terms" className={styles.checkboxLabel}>
                            Mandatory: “I acknowledge that <strong>Monkey Ads</strong> holds exclusive, perpetual ownership and usage rights for all content produced during our collaboration, across all media and platforms.”
                        </label>
                    </div>

                    <button type="submit" disabled={loading} className={styles.submitBtn}>
                        {loading ? 'Submitting...' : 'Register Profile'}
                    </button>

                    <div style={{ textAlign: 'center', marginTop: '1rem', color: '#666' }}>
                        Already registered? <Link href="/login" style={{ color: 'var(--primary)', fontWeight: 600 }}>Login here</Link>
                    </div>

                </form>
            </motion.div>
        </div>
    )
}

// Helper Component for consistent fields
function Field({ type, name, label, required = false, placeholder, options, fullWidth, onChange }: any) {
    return (
        <div className={`${styles.formGroup} ${fullWidth ? styles.fullWidth : ''}`}>
            <label className={styles.label}>{label} {required && '*'}</label>

            {type === 'textarea' ? (
                <textarea name={name} className={styles.textarea} required={required} placeholder={placeholder} rows={4} onChange={onChange} />
            ) : type === 'select' ? (
                <select name={name} className={styles.select} required={required} onChange={onChange}>
                    <option value="">Select...</option>
                    {options?.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
                </select>
            ) : (
                <input type={type} name={name} className={styles.input} required={required} placeholder={placeholder} onChange={onChange} />
            )}
        </div>
    )
}
