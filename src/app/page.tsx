"use client"

import { useState } from "react"
import { Check, Star, ArrowRight, Users, GraduationCap, Stethoscope, Calculator, Heart, Shield, Zap, BookOpen, TrendingUp, Clock, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function LandingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')

  const features = {
    basic: [
      "Calculadoras energéticas completas",
      "Antropometria e bioimpedância",
      "Tabela TACO integrada",
      "Referências hospitalares",
      "Conteúdo para estudantes",
      "Suporte por email"
    ],
    pro: [
      "Tudo do plano Básico",
      "Gestão completa de pacientes",
      "Prontuário eletrônico",
      "Gráficos de evolução",
      "Upload de fotos comparativas",
      "Histórico de consultas",
      "Backup automático",
      "Suporte prioritário"
    ]
  }

  const pricing = {
    basic: {
      monthly: 29,
      yearly: 290
    },
    pro: {
      monthly: 59,
      yearly: 590
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">NutriApp Pro</h1>
                <p className="text-sm text-gray-600">Ferramenta completa para nutricionistas</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost">Entrar</Button>
              <Link href="/dashboard">
                <Button className="bg-emerald-600 hover:bg-emerald-700">
                  Acessar App
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-6 bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
            🚀 Novo: Sistema de Gestão de Pacientes
          </Badge>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            A ferramenta completa para
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 block">
              nutricionistas modernos
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Pare de usar 10 planilhas diferentes. Centralize calculadoras, referências e 
            gestão de pacientes em uma única plataforma profissional.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/dashboard">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-lg px-8 py-4">
                Começar Teste Grátis
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-lg px-8 py-4">
              Ver Demonstração
            </Button>
          </div>

          <div className="flex items-center justify-center gap-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-600" />
              Dados seguros (LGPD)
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-600" />
              Acesso instantâneo
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-600" />
              Aprovado por nutricionistas
            </div>
          </div>
        </div>
      </section>

      {/* Problem/Solution */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Pare de perder tempo com ferramentas espalhadas
              </h2>
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mt-1">
                    <span className="text-red-600 text-sm">✗</span>
                  </div>
                  <p className="text-gray-600">Calculadoras em sites diferentes e não confiáveis</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mt-1">
                    <span className="text-red-600 text-sm">✗</span>
                  </div>
                  <p className="text-gray-600">Planilhas desorganizadas para cada paciente</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mt-1">
                    <span className="text-red-600 text-sm">✗</span>
                  </div>
                  <p className="text-gray-600">Referências espalhadas em PDFs e livros</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mt-1">
                    <span className="text-red-600 text-sm">✗</span>
                  </div>
                  <p className="text-gray-600">Dificuldade para acompanhar evolução dos pacientes</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-emerald-600 mb-6">
                Solução: Tudo em um só lugar
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center mt-1">
                    <Check className="w-4 h-4 text-emerald-600" />
                  </div>
                  <p className="text-gray-600">Calculadoras validadas e sempre atualizadas</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center mt-1">
                    <Check className="w-4 h-4 text-emerald-600" />
                  </div>
                  <p className="text-gray-600">Prontuário eletrônico completo e seguro</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center mt-1">
                    <Check className="w-4 h-4 text-emerald-600" />
                  </div>
                  <p className="text-gray-600">Referências organizadas por especialidade</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center mt-1">
                    <Check className="w-4 h-4 text-emerald-600" />
                  </div>
                  <p className="text-gray-600">Gráficos automáticos de evolução</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Recursos que fazem a diferença
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Desenvolvido por nutricionistas, para nutricionistas. Cada funcionalidade 
              foi pensada para otimizar seu trabalho diário.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Calculator className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>Calculadoras Profissionais</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Mifflin-St Jeor, Harris-Benedict, DRIs, antropometria completa, 
                  bioimpedância e muito mais.
                </p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Múltiplas fórmulas validadas</li>
                  <li>• Resultados instantâneos</li>
                  <li>• Histórico de cálculos</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-emerald-600" />
                </div>
                <CardTitle>Gestão de Pacientes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Prontuário eletrônico completo com histórico de consultas 
                  e acompanhamento de evolução.
                </p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Cadastro completo de pacientes</li>
                  <li>• Gráficos de evolução automáticos</li>
                  <li>• Fotos comparativas</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle>Referências Organizadas</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Tabela TACO, protocolos hospitalares, diretrizes e consensos 
                  sempre atualizados.
                </p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Busca rápida e inteligente</li>
                  <li>• Conteúdo por especialidade</li>
                  <li>• Sempre atualizado</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-white" id="pricing">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Escolha o plano ideal para você
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Comece com o Básico e evolua conforme sua prática cresce
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className={billingCycle === 'monthly' ? 'text-gray-900' : 'text-gray-500'}>
                Mensal
              </span>
              <button
                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
                className="relative w-12 h-6 bg-gray-200 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              >
                <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                  billingCycle === 'yearly' ? 'translate-x-6 bg-emerald-600' : ''
                }`} />
              </button>
              <span className={billingCycle === 'yearly' ? 'text-gray-900' : 'text-gray-500'}>
                Anual
                <Badge className="ml-2 bg-emerald-100 text-emerald-700">-17%</Badge>
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Plano Básico */}
            <Card className="border-2 border-gray-200 hover:border-emerald-300 transition-colors">
              <CardHeader className="text-center pb-8">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-2xl">Plano Básico</CardTitle>
                <CardDescription className="text-lg">
                  Perfeito para estudantes e recém-formados
                </CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">
                    R$ {pricing.basic[billingCycle]}
                  </span>
                  <span className="text-gray-600">
                    /{billingCycle === 'monthly' ? 'mês' : 'ano'}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-8">
                  {features.basic.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/dashboard">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Começar com Básico
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Plano Profissional */}
            <Card className="border-2 border-emerald-300 relative hover:border-emerald-400 transition-colors">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-emerald-600 text-white px-4 py-1">
                  Mais Popular
                </Badge>
              </div>
              <CardHeader className="text-center pb-8">
                <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Stethoscope className="w-8 h-8 text-emerald-600" />
                </div>
                <CardTitle className="text-2xl">Plano Profissional</CardTitle>
                <CardDescription className="text-lg">
                  Para nutricionistas que querem crescer
                </CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">
                    R$ {pricing.pro[billingCycle]}
                  </span>
                  <span className="text-gray-600">
                    /{billingCycle === 'monthly' ? 'mês' : 'ano'}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-8">
                  {features.pro.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/dashboard">
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                    Começar com Pro
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-600">
              Todos os planos incluem 7 dias de teste grátis. Cancele a qualquer momento.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              O que dizem os profissionais
            </h2>
            <p className="text-xl text-gray-600">
              Mais de 500 nutricionistas já confiam no NutriApp Pro
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="pt-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "Revolucionou minha prática! Antes eu perdia 30 minutos por consulta 
                  só procurando referências. Agora tenho tudo na palma da mão."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                    <span className="text-emerald-600 font-semibold">MC</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Maria Clara</p>
                    <p className="text-sm text-gray-600">Nutricionista Clínica</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="pt-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "Como recém-formado, o NutriApp me deu a confiança que eu precisava. 
                  As calculadoras são precisas e as referências sempre atualizadas."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold">RS</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Rafael Santos</p>
                    <p className="text-sm text-gray-600">Nutricionista Hospitalar</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="pt-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "O sistema de gestão de pacientes é fantástico! Consigo acompanhar 
                  a evolução de todos os meus pacientes de forma visual e organizada."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 font-semibold">AL</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Ana Luiza</p>
                    <p className="text-sm text-gray-600">Nutricionista Esportiva</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-teal-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Pronto para revolucionar sua prática?
          </h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
            Junte-se a centenas de nutricionistas que já otimizaram seu trabalho 
            com o NutriApp Pro. Teste grátis por 7 dias.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100 text-lg px-8 py-4">
                Começar Teste Grátis
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-emerald-600 text-lg px-8 py-4">
              Falar com Especialista
            </Button>
          </div>
          <p className="text-emerald-100 mt-4 text-sm">
            Sem compromisso • Cancele a qualquer momento • Suporte em português
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">NutriApp Pro</span>
              </div>
              <p className="text-gray-400">
                A ferramenta completa para nutricionistas modernos.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Produto</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Recursos</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Preços</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Demonstração</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Atualizações</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Suporte</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Central de Ajuda</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contato</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Comunidade</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacidade</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Termos</a></li>
                <li><a href="#" className="hover:text-white transition-colors">LGPD</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookies</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2024 NutriApp Pro. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}