"use client"

import { useState } from "react"
import { Calculator, Users, GraduationCap, Stethoscope, BookOpen, Activity, Heart, Brain, FileText, TrendingUp, Clock, Settings, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { EnergyCalculator } from "@/components/calculators/EnergyCalculator"
import { AdvancedAnthropometry } from "@/components/calculators/AdvancedAnthropometry"
import { ReferencesAndTaco } from "@/components/references/ReferencesAndTaco"

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState("overview")
  const [userPlan] = useState<'basic' | 'pro'>('pro') // Simulando plano do usuário

  // Dados simulados do usuário
  const user = {
    name: "Dr. Maria Silva",
    email: "maria@exemplo.com",
    plan: userPlan,
    patients: 24,
    consultations: 156,
    joinDate: "Janeiro 2024"
  }

  const studentAreas = [
    {
      title: "UAN - Unidade de Alimentação e Nutrição",
      description: "Gestão de serviços de alimentação coletiva",
      icon: Users,
      color: "bg-blue-500",
      content: "Guias de gestão, POPs, cálculo de cardápios, controle de qualidade"
    },
    {
      title: "Saúde Pública",
      description: "Políticas públicas e programas nutricionais",
      icon: Heart,
      color: "bg-green-500",
      content: "Guias alimentares, PNAE, PAT, avaliação de coletividades"
    },
    {
      title: "Hospitalar",
      description: "Nutrição clínica e terapia nutricional",
      icon: Stethoscope,
      color: "bg-red-500",
      content: "Triagem nutricional, dietas hospitalares, nutrição enteral/parenteral"
    },
    {
      title: "Clínica",
      description: "Atendimento nutricional individualizado",
      icon: Activity,
      color: "bg-purple-500",
      content: "Protocolos de anamnese, avaliação nutricional, planejamento dietético"
    }
  ]

  const professionalTools = [
    {
      title: "Calculadoras Energéticas",
      description: "Mifflin-St Jeor, Harris-Benedict, DRIs",
      icon: Calculator,
      action: () => setActiveSection("energy"),
      available: true,
      color: "from-blue-500 to-indigo-600"
    },
    {
      title: "Antropometria Avançada",
      description: "IMC, dobras cutâneas, composição corporal",
      icon: Activity,
      action: () => setActiveSection("anthropometry"),
      available: true,
      color: "from-green-500 to-emerald-600"
    },
    {
      title: "Bioimpedância",
      description: "Análise de composição corporal",
      icon: Brain,
      action: () => setActiveSection("bioimpedance"),
      available: true,
      color: "from-purple-500 to-pink-600"
    },
    {
      title: "Referências & TACO",
      description: "Tabela TACO e protocolos hospitalares",
      icon: BookOpen,
      action: () => setActiveSection("references"),
      available: true,
      color: "from-orange-500 to-red-600"
    },
    {
      title: "Gestão de Pacientes",
      description: "Prontuário eletrônico completo",
      icon: Users,
      action: () => setActiveSection("patients"),
      available: userPlan === 'pro',
      premium: true,
      color: "from-emerald-500 to-teal-600"
    },
    {
      title: "Relatórios e Gráficos",
      description: "Análise de evolução e relatórios",
      icon: TrendingUp,
      action: () => setActiveSection("reports"),
      available: userPlan === 'pro',
      premium: true,
      color: "from-indigo-500 to-purple-600"
    }
  ]

  const recentActivity = [
    { type: "calculation", description: "Cálculo energético - João Silva", time: "2 horas atrás" },
    { type: "patient", description: "Nova consulta - Ana Santos", time: "1 dia atrás" },
    { type: "reference", description: "Consultou protocolo DRC", time: "2 dias atrás" },
    { type: "calculation", description: "Antropometria - Carlos Lima", time: "3 dias atrás" }
  ]

  // Renderização condicional das seções
  if (activeSection === "energy") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <DashboardHeader user={user} onBack={() => setActiveSection("overview")} title="Calculadoras Energéticas" />
        <div className="container mx-auto px-4 py-8">
          <EnergyCalculator />
        </div>
      </div>
    )
  }

  if (activeSection === "anthropometry") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
        <DashboardHeader user={user} onBack={() => setActiveSection("overview")} title="Antropometria Avançada" />
        <div className="container mx-auto px-4 py-8">
          <AdvancedAnthropometry />
        </div>
      </div>
    )
  }

  if (activeSection === "references") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100">
        <DashboardHeader user={user} onBack={() => setActiveSection("overview")} title="Referências & TACO" />
        <div className="container mx-auto px-4 py-8">
          <ReferencesAndTaco />
        </div>
      </div>
    )
  }

  if (activeSection === "patients") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
        <DashboardHeader user={user} onBack={() => setActiveSection("overview")} title="Gestão de Pacientes" />
        <div className="container mx-auto px-4 py-8">
          <PatientsManager />
        </div>
      </div>
    )
  }

  if (activeSection === "bioimpedance") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
        <DashboardHeader user={user} onBack={() => setActiveSection("overview")} title="Bioimpedância" />
        <div className="container mx-auto px-4 py-8">
          <BioimpedanceAnalysis />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-emerald-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">NutriApp Pro</h1>
                <p className="text-sm text-gray-600">Dashboard Profissional</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant={userPlan === 'pro' ? 'default' : 'secondary'} className={userPlan === 'pro' ? 'bg-emerald-100 text-emerald-700' : ''}>
                Plano {userPlan === 'pro' ? 'Profissional' : 'Básico'}
              </Badge>
              <Avatar>
                <AvatarFallback>MS</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Bem-vindo, {user.name.split(' ')[1]}! 👋
          </h2>
          <p className="text-gray-600">
            Aqui está um resumo da sua atividade e acesso rápido às suas ferramentas.
          </p>
        </div>

        {/* Stats Cards */}
        {userPlan === 'pro' && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-white/70 backdrop-blur-sm border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Pacientes Ativos</p>
                    <p className="text-2xl font-bold text-gray-900">{user.patients}</p>
                  </div>
                  <Users className="w-8 h-8 text-emerald-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Consultas Realizadas</p>
                    <p className="text-2xl font-bold text-gray-900">{user.consultations}</p>
                  </div>
                  <Stethoscope className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Próximas Consultas</p>
                    <p className="text-2xl font-bold text-gray-900">8</p>
                  </div>
                  <Clock className="w-8 h-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Taxa de Evolução</p>
                    <p className="text-2xl font-bold text-gray-900">87%</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <Tabs defaultValue="professional" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="professional" className="flex items-center gap-2">
              <Stethoscope className="w-4 h-4" />
              Ferramentas Profissionais
            </TabsTrigger>
            <TabsTrigger value="students" className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              Conteúdo Acadêmico
            </TabsTrigger>
          </TabsList>

          {/* Ferramentas Profissionais */}
          <TabsContent value="professional" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {professionalTools.map((tool, index) => (
                <Card 
                  key={index} 
                  className={`group hover:shadow-xl transition-all duration-300 border-0 bg-white/70 backdrop-blur-sm hover:bg-white/90 ${
                    tool.available ? 'cursor-pointer' : 'opacity-60'
                  }`}
                  onClick={tool.available ? tool.action : undefined}
                >
                  <CardHeader className="text-center pb-4">
                    <div className={`w-16 h-16 bg-gradient-to-br ${tool.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <tool.icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-lg font-semibold text-gray-900 flex items-center justify-center gap-2">
                      {tool.title}
                      {tool.premium && userPlan !== 'pro' && (
                        <Badge variant="secondary" className="text-xs">PRO</Badge>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center text-gray-600 mb-4">
                      {tool.description}
                    </CardDescription>
                    <Button 
                      className={`w-full ${
                        tool.available 
                          ? `bg-gradient-to-r ${tool.color} hover:opacity-90`
                          : 'bg-gray-400 cursor-not-allowed'
                      }`}
                      disabled={!tool.available}
                    >
                      {tool.available ? 'Acessar' : 'Upgrade para Pro'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Atividade Recente */}
            {userPlan === 'pro' && (
              <Card className="bg-white/70 backdrop-blur-sm border-0">
                <CardHeader>
                  <CardTitle>Atividade Recente</CardTitle>
                  <CardDescription>Suas últimas ações no sistema</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                        <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                          {activity.type === 'calculation' && <Calculator className="w-4 h-4 text-emerald-600" />}
                          {activity.type === 'patient' && <Users className="w-4 h-4 text-emerald-600" />}
                          {activity.type === 'reference' && <BookOpen className="w-4 h-4 text-emerald-600" />}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                          <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Conteúdo Acadêmico */}
          <TabsContent value="students" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {studentAreas.map((area, index) => (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/70 backdrop-blur-sm hover:bg-white/90">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 ${area.color} rounded-xl flex items-center justify-center`}>
                        <area.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{area.title}</CardTitle>
                        <CardDescription>{area.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">{area.content}</p>
                    <Button className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700">
                      Explorar Conteúdo
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

// Componente do Header do Dashboard
function DashboardHeader({ user, onBack, title }: { user: any, onBack: () => void, title: string }) {
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="flex items-center gap-2 hover:bg-gray-100"
            >
              ← Voltar
            </Button>
            <div className="h-6 w-px bg-gray-300" />
            <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant={user.plan === 'pro' ? 'default' : 'secondary'}>
              {user.plan === 'pro' ? 'Pro' : 'Básico'}
            </Badge>
            <Avatar>
              <AvatarFallback>MS</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  )
}

// Componente de Gestão de Pacientes
function PatientsManager() {
  const [patients] = useState([
    { id: 1, name: "João Silva", age: 35, lastConsult: "15/01/2024", status: "Em acompanhamento" },
    { id: 2, name: "Ana Santos", age: 28, lastConsult: "12/01/2024", status: "Primeira consulta" },
    { id: 3, name: "Carlos Lima", age: 42, lastConsult: "10/01/2024", status: "Retorno" }
  ])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gestão de Pacientes</h2>
          <p className="text-gray-600">Gerencie seus pacientes e acompanhe a evolução</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700">
          + Novo Paciente
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-white/70 backdrop-blur-sm border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total de Pacientes</p>
                <p className="text-2xl font-bold text-gray-900">24</p>
              </div>
              <Users className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/70 backdrop-blur-sm border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Consultas Hoje</p>
                <p className="text-2xl font-bold text-gray-900">5</p>
              </div>
              <Clock className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/70 backdrop-blur-sm border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Em Evolução</p>
                <p className="text-2xl font-bold text-gray-900">18</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white/70 backdrop-blur-sm border-0">
        <CardHeader>
          <CardTitle>Pacientes Recentes</CardTitle>
          <CardDescription>Últimos pacientes cadastrados e consultados</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {patients.map((patient) => (
              <div key={patient.id} className="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarFallback>{patient.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-gray-900">{patient.name}</p>
                    <p className="text-sm text-gray-600">{patient.age} anos • Última consulta: {patient.lastConsult}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="outline">{patient.status}</Badge>
                  <Button size="sm" variant="outline">
                    Ver Perfil
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Componente de Bioimpedância
function BioimpedanceAnalysis() {
  const [formData, setFormData] = useState({
    resistance: "",
    reactance: "",
    weight: "",
    height: "",
    age: "",
    gender: ""
  })

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Análise de Bioimpedância</h2>
        <p className="text-gray-600">Avaliação da composição corporal por bioimpedância elétrica</p>
      </div>

      <Card className="bg-white/70 backdrop-blur-sm border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5" />
            Dados da Bioimpedância
          </CardTitle>
          <CardDescription>
            Insira os valores obtidos do equipamento de bioimpedância
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Resistência (Ω)</label>
              <input
                type="number"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="500"
                value={formData.resistance}
                onChange={(e) => setFormData({ ...formData, resistance: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Reatância (Ω)</label>
              <input
                type="number"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="50"
                value={formData.reactance}
                onChange={(e) => setFormData({ ...formData, reactance: e.target.value })}
              />
            </div>
          </div>

          <div className="text-center py-8 text-gray-500">
            <Brain className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Funcionalidade em desenvolvimento</p>
            <p className="text-sm">Em breve: análise completa de bioimpedância com gráficos de evolução</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}