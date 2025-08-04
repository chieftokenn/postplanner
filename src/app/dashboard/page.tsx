'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Logo } from '@/components/ui/logo'
import { Navbar } from '@/components/ui/navbar'
import { 
  Plus, 
  Calendar, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Linkedin, 
  Twitter,
  BarChart3,
  Settings,
  LogOut
} from 'lucide-react'

// Mock data - à remplacer par les vraies données de Supabase
const mockPosts = [
  {
    id: '1',
    content: 'Nouveau post LinkedIn sur les tendances du marketing digital en 2024...',
    platform: 'linkedin' as const,
    status: 'scheduled' as const,
    scheduledAt: '2024-01-15T10:00:00Z',
    publishedAt: null,
    createdAt: '2024-01-10T14:30:00Z'
  },
  {
    id: '2',
    content: 'Thread Twitter sur les meilleures pratiques pour optimiser son profil LinkedIn...',
    platform: 'twitter' as const,
    status: 'published' as const,
    scheduledAt: '2024-01-12T15:30:00Z',
    publishedAt: '2024-01-12T15:30:00Z',
    createdAt: '2024-01-08T09:15:00Z'
  },
  {
    id: '3',
    content: 'Partage d\'article sur les nouvelles fonctionnalités de notre plateforme...',
    platform: 'linkedin' as const,
    status: 'draft' as const,
    scheduledAt: null,
    publishedAt: null,
    createdAt: '2024-01-14T16:45:00Z'
  }
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'published':
      return 'text-green-600 bg-green-100'
    case 'scheduled':
      return 'text-blue-600 bg-blue-100'
    case 'draft':
      return 'text-gray-600 bg-gray-100'
    case 'failed':
      return 'text-red-600 bg-red-100'
    default:
      return 'text-gray-600 bg-gray-100'
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'published':
      return <CheckCircle className="w-4 h-4" />
    case 'scheduled':
      return <Clock className="w-4 h-4" />
    case 'draft':
      return <Calendar className="w-4 h-4" />
    case 'failed':
      return <AlertCircle className="w-4 h-4" />
    default:
      return <Calendar className="w-4 h-4" />
  }
}

const getStatusText = (status: string) => {
  switch (status) {
    case 'published':
      return 'Publié'
    case 'scheduled':
      return 'Programmé'
    case 'draft':
      return 'Brouillon'
    case 'failed':
      return 'Échec'
    default:
      return 'Inconnu'
  }
}

const getPlatformIcon = (platform: string) => {
  switch (platform) {
    case 'linkedin':
      return <Linkedin className="w-4 h-4" />
    case 'twitter':
      return <Twitter className="w-4 h-4" />
    default:
      return <Linkedin className="w-4 h-4" />
  }
}

export default function DashboardPage() {
  const [selectedFilter, setSelectedFilter] = useState('all')

  const filteredPosts = mockPosts.filter(post => {
    if (selectedFilter === 'all') return true
    return post.status === selectedFilter
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Modern Navbar */}
      <Navbar variant="dashboard" />

      {/* Main Content */}
      <main className="container mx-auto px-4 pt-24 pb-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Tableau de bord
            </h1>
            <p className="text-gray-600">
              Gérez vos posts programmés et suivez vos performances
            </p>
          </div>
          <Button asChild className="mt-4 sm:mt-0">
            <Link href="/dashboard/create">
              <Plus className="w-4 h-4 mr-2" />
              Créer un post
            </Link>
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Posts programmés</p>
                  <p className="text-2xl font-bold text-gray-900">12</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Posts publiés</p>
                  <p className="text-2xl font-bold text-gray-900">45</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Taux d'engagement</p>
                  <p className="text-2xl font-bold text-gray-900">8.2%</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Comptes connectés</p>
                  <p className="text-2xl font-bold text-gray-900">2</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Linkedin className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Posts Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Vos posts</h2>
            
            {/* Filter Buttons */}
            <div className="flex space-x-2">
              <Button
                variant={selectedFilter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedFilter('all')}
              >
                Tous
              </Button>
              <Button
                variant={selectedFilter === 'scheduled' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedFilter('scheduled')}
              >
                Programmés
              </Button>
              <Button
                variant={selectedFilter === 'published' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedFilter('published')}
              >
                Publiés
              </Button>
              <Button
                variant={selectedFilter === 'draft' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedFilter('draft')}
              >
                Brouillons
              </Button>
            </div>
          </div>

          {/* Posts List */}
          <div className="space-y-4">
            {filteredPosts.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Aucun post trouvé
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {selectedFilter === 'all' 
                      ? 'Commencez par créer votre premier post'
                      : `Aucun post ${selectedFilter === 'scheduled' ? 'programmé' : selectedFilter === 'published' ? 'publié' : 'brouillon'}`
                    }
                  </p>
                  <Button asChild>
                    <Link href="/dashboard/create">
                      <Plus className="w-4 h-4 mr-2" />
                      Créer un post
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              filteredPosts.map((post) => (
                <Card key={post.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          {getPlatformIcon(post.platform)}
                          <span className="text-sm font-medium text-gray-900 capitalize">
                            {post.platform}
                          </span>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(post.status)}`}>
                            {getStatusIcon(post.status)}
                            <span className="ml-1">{getStatusText(post.status)}</span>
                          </span>
                        </div>
                        
                        <p className="text-gray-900 mb-3 line-clamp-2">
                          {post.content}
                        </p>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>
                            Créé le {new Date(post.createdAt).toLocaleDateString('fr-FR')}
                          </span>
                          {post.scheduledAt && (
                            <span>
                              Programmé le {new Date(post.scheduledAt).toLocaleDateString('fr-FR')} à {new Date(post.scheduledAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          )}
                          {post.publishedAt && (
                            <span>
                              Publié le {new Date(post.publishedAt).toLocaleDateString('fr-FR')}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 ml-4">
                        <Button variant="outline" size="sm">
                          Modifier
                        </Button>
                        <Button variant="outline" size="sm">
                          Supprimer
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  )
} 