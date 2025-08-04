'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  ArrowLeft, 
  Linkedin, 
  Twitter, 
  Calendar, 
  Clock, 
  Zap,
  CheckCircle,
  AlertCircle
} from 'lucide-react'

const optimalTimes = {
  linkedin: [
    { time: '09:00', day: 'Lundi', engagement: 'Élevé' },
    { time: '12:00', day: 'Mardi', engagement: 'Élevé' },
    { time: '14:00', day: 'Mercredi', engagement: 'Élevé' },
    { time: '10:00', day: 'Jeudi', engagement: 'Élevé' },
    { time: '11:00', day: 'Vendredi', engagement: 'Élevé' },
  ],
  twitter: [
    { time: '08:00', day: 'Lundi', engagement: 'Élevé' },
    { time: '13:00', day: 'Mardi', engagement: 'Élevé' },
    { time: '15:00', day: 'Mercredi', engagement: 'Élevé' },
    { time: '09:00', day: 'Jeudi', engagement: 'Élevé' },
    { time: '12:00', day: 'Vendredi', engagement: 'Élevé' },
  ]
}

export default function CreatePostPage() {
  const router = useRouter()
  const [selectedPlatform, setSelectedPlatform] = useState<'linkedin' | 'twitter' | null>(null)
  const [content, setContent] = useState('')
  const [scheduledDate, setScheduledDate] = useState('')
  const [scheduledTime, setScheduledTime] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showOptimalTimes, setShowOptimalTimes] = useState(false)

  const maxLength = selectedPlatform === 'twitter' ? 280 : 3000
  const currentLength = content.length
  const isOverLimit = currentLength > maxLength

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedPlatform) {
      alert('Veuillez sélectionner une plateforme')
      return
    }
    if (!content.trim()) {
      alert('Veuillez saisir le contenu du post')
      return
    }
    if (isOverLimit) {
      alert('Le contenu dépasse la limite de caractères')
      return
    }

    setIsLoading(true)
    // TODO: Implement post creation logic
    setTimeout(() => {
      setIsLoading(false)
      router.push('/dashboard')
    }, 2000)
  }

  const handleOptimalTimeSelect = (time: string, day: string) => {
    // Calculate the next occurrence of this day and time
    const now = new Date()
    const targetDay = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'].indexOf(day)
    const [hours, minutes] = time.split(':').map(Number)
    
    let targetDate = new Date()
    targetDate.setHours(hours, minutes, 0, 0)
    
    // Find next occurrence of this day
    while (targetDate.getDay() !== targetDay || targetDate <= now) {
      targetDate.setDate(targetDate.getDate() + 1)
    }
    
    setScheduledDate(targetDate.toISOString().split('T')[0])
    setScheduledTime(time)
    setShowOptimalTimes(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                <ArrowLeft className="w-4 h-4" />
                <span>Retour au dashboard</span>
              </Link>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              <span className="text-xl font-bold text-gray-900">PostPlanner</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Créer un nouveau post
            </h1>
            <p className="text-gray-600">
              Rédigez votre contenu et programmez sa publication
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Platform Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Plateforme</CardTitle>
                <CardDescription>
                  Choisissez sur quelle plateforme publier votre post
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setSelectedPlatform('linkedin')}
                    className={`p-6 border-2 rounded-lg text-left transition-all ${
                      selectedPlatform === 'linkedin'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <Linkedin className="w-6 h-6 text-blue-600" />
                      <span className="text-lg font-semibold">LinkedIn</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      Idéal pour le contenu professionnel et B2B
                    </p>
                    <p className="text-xs text-gray-500">
                      Limite : 3000 caractères
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedPlatform('twitter')}
                    className={`p-6 border-2 rounded-lg text-left transition-all ${
                      selectedPlatform === 'twitter'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <Twitter className="w-6 h-6 text-blue-400" />
                      <span className="text-lg font-semibold">Twitter</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      Parfait pour les conversations et l'engagement
                    </p>
                    <p className="text-xs text-gray-500">
                      Limite : 280 caractères
                    </p>
                  </button>
                </div>
              </CardContent>
            </Card>

            {/* Content Editor */}
            <Card>
              <CardHeader>
                <CardTitle>Contenu du post</CardTitle>
                <CardDescription>
                  Rédigez votre message. Utilisez des hashtags pour augmenter votre visibilité.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Textarea
                    placeholder="Que souhaitez-vous partager ?"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="min-h-[200px] resize-none"
                    maxLength={maxLength}
                  />
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {isOverLimit ? (
                        <AlertCircle className="w-4 h-4 text-red-500" />
                      ) : (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      )}
                      <span className={`text-sm ${isOverLimit ? 'text-red-600' : 'text-gray-600'}`}>
                        {currentLength} / {maxLength} caractères
                      </span>
                    </div>
                    
                    <div className="text-sm text-gray-500">
                      {selectedPlatform === 'linkedin' && (
                        <span>💡 Utilisez des hashtags pertinents pour LinkedIn</span>
                      )}
                      {selectedPlatform === 'twitter' && (
                        <span>💡 Gardez vos tweets concis et engageants</span>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Scheduling */}
            <Card>
              <CardHeader>
                <CardTitle>Planification</CardTitle>
                <CardDescription>
                  Choisissez quand publier votre post
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Optimal Times Button */}
                  {selectedPlatform && (
                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                      <div>
                        <h4 className="font-semibold text-blue-900 mb-1">
                          Horaires optimaux pour {selectedPlatform === 'linkedin' ? 'LinkedIn' : 'Twitter'}
                        </h4>
                        <p className="text-sm text-blue-700">
                          Nos recommandations basées sur l'engagement de votre audience
                        </p>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowOptimalTimes(!showOptimalTimes)}
                      >
                        <Zap className="w-4 h-4 mr-2" />
                        Voir les horaires optimaux
                      </Button>
                    </div>
                  )}

                  {/* Optimal Times List */}
                  {showOptimalTimes && selectedPlatform && (
                    <div className="border rounded-lg p-4">
                      <h4 className="font-semibold mb-3">Horaires recommandés :</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {optimalTimes[selectedPlatform].map((time, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => handleOptimalTimeSelect(time.time, time.day)}
                            className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <div>
                              <span className="font-medium">{time.day}</span>
                              <span className="text-gray-500 ml-2">{time.time}</span>
                            </div>
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                              {time.engagement}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Manual Scheduling */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="scheduledDate" className="block text-sm font-medium mb-2">
                        Date de publication
                      </label>
                      <Input
                        id="scheduledDate"
                        type="date"
                        value={scheduledDate}
                        onChange={(e) => setScheduledDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    <div>
                      <label htmlFor="scheduledTime" className="block text-sm font-medium mb-2">
                        Heure de publication
                      </label>
                      <Input
                        id="scheduledTime"
                        type="time"
                        value={scheduledTime}
                        onChange={(e) => setScheduledTime(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Publish Now Option */}
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="publishNow"
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="publishNow" className="text-sm text-gray-700">
                      Publier immédiatement (au lieu de programmer)
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Submit Buttons */}
            <div className="flex items-center justify-between pt-6 border-t">
              <Button variant="outline" type="button" asChild>
                <Link href="/dashboard">
                  Annuler
                </Link>
              </Button>
              
              <div className="flex space-x-3">
                <Button variant="outline" type="button">
                  Enregistrer comme brouillon
                </Button>
                <Button type="submit" disabled={isLoading || !selectedPlatform || !content.trim() || isOverLimit}>
                  {isLoading ? "Création..." : "Programmer la publication"}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
} 