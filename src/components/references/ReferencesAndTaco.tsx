"use client"

import { useState } from "react"
import { Search, BookOpen, Filter, Download, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Dados simulados da Tabela TACO
const tacoData = [
  {
    id: 1,
    name: "Arroz, integral, cozido",
    category: "Cereais e derivados",
    energy: 124,
    protein: 2.6,
    carbs: 25.8,
    fat: 1.0,
    fiber: 2.7,
    calcium: 5,
    iron: 0.3,
    sodium: 1
  },
  {
    id: 2,
    name: "Feijão, carioca, cozido",
    category: "Leguminosas",
    energy: 76,
    protein: 4.8,
    carbs: 13.6,
    fat: 0.5,
    fiber: 8.5,
    calcium: 27,
    iron: 1.3,
    sodium: 2
  },
  {
    id: 3,
    name: "Frango, peito, sem pele, cozido",
    category: "Carnes e derivados",
    energy: 159,
    protein: 32.0,
    carbs: 0,
    fat: 3.2,
    fiber: 0,
    calcium: 2,
    iron: 0.4,
    sodium: 77
  },
  {
    id: 4,
    name: "Banana, nanica",
    category: "Frutas",
    energy: 92,
    protein: 1.3,
    carbs: 23.8,
    fat: 0.1,
    fiber: 2.0,
    calcium: 8,
    iron: 0.4,
    sodium: 2
  },
  {
    id: 5,
    name: "Leite, vaca, integral",
    category: "Leite e derivados",
    energy: 61,
    protein: 2.9,
    carbs: 4.3,
    fat: 3.2,
    fiber: 0,
    calcium: 113,
    iron: 0.1,
    sodium: 4
  },
  {
    id: 6,
    name: "Brócolis, cozido",
    category: "Hortaliças",
    energy: 25,
    protein: 3.1,
    carbs: 4.0,
    fat: 0.4,
    fiber: 3.4,
    calcium: 86,
    iron: 0.5,
    sodium: 8
  },
  {
    id: 7,
    name: "Aveia, flocos",
    category: "Cereais e derivados",
    energy: 394,
    protein: 13.9,
    carbs: 66.6,
    fat: 8.5,
    fiber: 9.1,
    calcium: 48,
    iron: 4.4,
    sodium: 5
  },
  {
    id: 8,
    name: "Salmão, cozido",
    category: "Pescados",
    energy: 216,
    protein: 23.8,
    carbs: 0,
    fat: 12.4,
    fiber: 0,
    calcium: 59,
    iron: 0.3,
    sodium: 59
  }
]

const categories = [
  "Todos",
  "Cereais e derivados",
  "Leguminosas",
  "Carnes e derivados",
  "Frutas",
  "Leite e derivados",
  "Hortaliças",
  "Pescados"
]

const hospitalReferences = [
  {
    title: "Triagem Nutricional - NRS 2002",
    category: "Triagem",
    description: "Nutritional Risk Screening para identificação de risco nutricional em pacientes hospitalizados",
    content: "Pontuação baseada em estado nutricional atual, gravidade da doença e idade. Score ≥3 indica risco nutricional.",
    tags: ["Triagem", "Hospitalar", "Risco"]
  },
  {
    title: "Dieta para Doença Renal Crônica",
    category: "Protocolos",
    description: "Diretrizes nutricionais para pacientes com DRC em diferentes estágios",
    content: "Restrição proteica: 0,6-0,8g/kg/dia nos estágios 3-5. Controle de fósforo, potássio e sódio conforme função renal.",
    tags: ["DRC", "Proteína", "Eletrólitos"]
  },
  {
    title: "Nutrição Enteral - Cálculo de Gotejamento",
    category: "Terapia Nutricional",
    description: "Fórmulas para cálculo de velocidade de infusão de dieta enteral",
    content: "Volume total (mL) ÷ Tempo de infusão (h) ÷ 3 = gotas/min. Para microgotas: Volume ÷ Tempo = microgotas/min",
    tags: ["Enteral", "Cálculo", "Gotejamento"]
  },
  {
    title: "Avaliação Subjetiva Global (ASG)",
    category: "Avaliação",
    description: "Método de avaliação do estado nutricional baseado em história clínica e exame físico",
    content: "Classificação: A (bem nutrido), B (moderadamente desnutrido), C (gravemente desnutrido)",
    tags: ["ASG", "Avaliação", "Estado Nutricional"]
  }
]

export function ReferencesAndTaco() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const [filteredFoods, setFilteredFoods] = useState(tacoData)
  const [selectedFood, setSelectedFood] = useState<typeof tacoData[0] | null>(null)

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    filterFoods(term, selectedCategory)
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    filterFoods(searchTerm, category)
  }

  const filterFoods = (term: string, category: string) => {
    let filtered = tacoData

    if (category !== "Todos") {
      filtered = filtered.filter(food => food.category === category)
    }

    if (term) {
      filtered = filtered.filter(food => 
        food.name.toLowerCase().includes(term.toLowerCase())
      )
    }

    setFilteredFoods(filtered)
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Referências e Tabela TACO</h2>
        <p className="text-gray-600">Acesso rápido a informações nutricionais e protocolos clínicos</p>
      </div>

      <Tabs defaultValue="taco" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="taco">Tabela TACO</TabsTrigger>
          <TabsTrigger value="references">Referências Hospitalares</TabsTrigger>
        </TabsList>

        {/* Tabela TACO */}
        <TabsContent value="taco" className="space-y-6">
          <Card className="bg-white/70 backdrop-blur-sm border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="w-5 h-5" />
                Busca na Tabela TACO
              </CardTitle>
              <CardDescription>
                Composição nutricional de alimentos brasileiros
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Buscar alimento..."
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="w-full"
                  />
                </div>
                <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-4 max-h-96 overflow-y-auto">
                {filteredFoods.map((food) => (
                  <div
                    key={food.id}
                    className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => setSelectedFood(food)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">{food.name}</h4>
                        <p className="text-sm text-gray-600">{food.category}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-indigo-600">{food.energy} kcal</p>
                        <p className="text-sm text-gray-600">por 100g</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredFoods.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Nenhum alimento encontrado</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Detalhes do Alimento Selecionado */}
          {selectedFood && (
            <Card className="bg-white/70 backdrop-blur-sm border-0">
              <CardHeader>
                <CardTitle>{selectedFood.name}</CardTitle>
                <CardDescription>Informações nutricionais por 100g</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Macronutrientes</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Energia:</span>
                        <span className="font-medium">{selectedFood.energy} kcal</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Proteínas:</span>
                        <span className="font-medium">{selectedFood.protein} g</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Carboidratos:</span>
                        <span className="font-medium">{selectedFood.carbs} g</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Lipídios:</span>
                        <span className="font-medium">{selectedFood.fat} g</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Fibras:</span>
                        <span className="font-medium">{selectedFood.fiber} g</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Micronutrientes</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Cálcio:</span>
                        <span className="font-medium">{selectedFood.calcium} mg</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Ferro:</span>
                        <span className="font-medium">{selectedFood.iron} mg</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sódio:</span>
                        <span className="font-medium">{selectedFood.sodium} mg</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 mt-6">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Star className="w-4 h-4 mr-2" />
                    Favoritar
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Download className="w-4 h-4 mr-2" />
                    Exportar
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Referências Hospitalares */}
        <TabsContent value="references" className="space-y-6">
          <div className="grid gap-6">
            {hospitalReferences.map((reference, index) => (
              <Card key={index} className="bg-white/70 backdrop-blur-sm border-0 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{reference.title}</CardTitle>
                      <CardDescription>{reference.description}</CardDescription>
                    </div>
                    <Badge variant="outline">{reference.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">{reference.content}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      {reference.tags.map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Button size="sm" variant="outline">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Ver Completo
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-0">
            <CardContent className="p-6 text-center">
              <BookOpen className="w-12 h-12 mx-auto mb-4 text-indigo-600" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Mais Referências Disponíveis
              </h3>
              <p className="text-gray-600 mb-4">
                Acesse nossa biblioteca completa com mais de 100 protocolos e diretrizes atualizadas
              </p>
              <Button className="bg-indigo-600 hover:bg-indigo-700">
                Explorar Biblioteca
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}