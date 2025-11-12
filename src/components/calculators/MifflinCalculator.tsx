"use client"

import { useState } from "react"
import { Calculator, User, Scale, Ruler, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

interface CalculationResult {
  bmr: number
  tdee: number
  activityLevel: string
}

export function MifflinCalculator() {
  const [weight, setWeight] = useState("")
  const [height, setHeight] = useState("")
  const [age, setAge] = useState("")
  const [gender, setGender] = useState("")
  const [activityLevel, setActivityLevel] = useState("")
  const [result, setResult] = useState<CalculationResult | null>(null)

  const activityLevels = [
    { value: "1.2", label: "Sedentário", description: "Pouco ou nenhum exercício" },
    { value: "1.375", label: "Levemente ativo", description: "Exercício leve 1-3 dias/semana" },
    { value: "1.55", label: "Moderadamente ativo", description: "Exercício moderado 3-5 dias/semana" },
    { value: "1.725", label: "Muito ativo", description: "Exercício intenso 6-7 dias/semana" },
    { value: "1.9", label: "Extremamente ativo", description: "Exercício muito intenso, trabalho físico" }
  ]

  const calculateMifflin = () => {
    if (!weight || !height || !age || !gender || !activityLevel) {
      alert("Por favor, preencha todos os campos")
      return
    }

    const w = parseFloat(weight)
    const h = parseFloat(height)
    const a = parseFloat(age)
    const activity = parseFloat(activityLevel)

    let bmr: number

    if (gender === "male") {
      bmr = (10 * w) + (6.25 * h) - (5 * a) + 5
    } else {
      bmr = (10 * w) + (6.25 * h) - (5 * a) - 161
    }

    const tdee = bmr * activity
    const selectedActivity = activityLevels.find(level => level.value === activityLevel)

    setResult({
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      activityLevel: selectedActivity?.label || ""
    })
  }

  const clearForm = () => {
    setWeight("")
    setHeight("")
    setAge("")
    setGender("")
    setActivityLevel("")
    setResult(null)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Calculadoras Energéticas</h2>
        <p className="text-gray-600">Calcule o gasto energético basal e total usando diferentes fórmulas</p>
      </div>

      <Tabs defaultValue="mifflin" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="mifflin">Mifflin-St Jeor</TabsTrigger>
          <TabsTrigger value="harris">Harris-Benedict</TabsTrigger>
          <TabsTrigger value="dris">DRIs</TabsTrigger>
        </TabsList>

        <TabsContent value="mifflin" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-blue-600" />
                Fórmula de Mifflin-St Jeor
              </CardTitle>
              <CardDescription>
                Considerada uma das fórmulas mais precisas para cálculo do metabolismo basal
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Dados Pessoais */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Dados Pessoais
                  </h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="weight">Peso (kg)</Label>
                    <div className="relative">
                      <Scale className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <Input
                        id="weight"
                        type="number"
                        placeholder="Ex: 70"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="height">Altura (cm)</Label>
                    <div className="relative">
                      <Ruler className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <Input
                        id="height"
                        type="number"
                        placeholder="Ex: 175"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="age">Idade (anos)</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <Input
                        id="age"
                        type="number"
                        placeholder="Ex: 30"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gender">Sexo</Label>
                    <Select value={gender} onValueChange={setGender}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o sexo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Masculino</SelectItem>
                        <SelectItem value="female">Feminino</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Nível de Atividade */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Nível de Atividade Física</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="activity">Selecione o nível</Label>
                    <Select value={activityLevel} onValueChange={setActivityLevel}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o nível de atividade" />
                      </SelectTrigger>
                      <SelectContent>
                        {activityLevels.map((level) => (
                          <SelectItem key={level.value} value={level.value}>
                            <div className="flex flex-col">
                              <span className="font-medium">{level.label}</span>
                              <span className="text-sm text-gray-500">{level.description}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {activityLevel && (
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <strong>Fator de atividade:</strong> {activityLevel}
                      </p>
                      <p className="text-sm text-blue-600 mt-1">
                        {activityLevels.find(level => level.value === activityLevel)?.description}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-4">
                <Button onClick={calculateMifflin} className="flex-1 bg-blue-600 hover:bg-blue-700">
                  <Calculator className="w-4 h-4 mr-2" />
                  Calcular
                </Button>
                <Button variant="outline" onClick={clearForm}>
                  Limpar
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Resultados */}
          {result && (
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-green-800">Resultados do Cálculo</CardTitle>
                <CardDescription className="text-green-600">
                  Baseado na fórmula de Mifflin-St Jeor
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-white rounded-lg border border-green-200">
                    <h4 className="font-semibold text-gray-900 mb-2">Taxa Metabólica Basal (TMB)</h4>
                    <p className="text-2xl font-bold text-green-600">{result.bmr} kcal/dia</p>
                    <p className="text-sm text-gray-600 mt-1">
                      Energia necessária para funções vitais em repouso
                    </p>
                  </div>

                  <div className="p-4 bg-white rounded-lg border border-green-200">
                    <h4 className="font-semibold text-gray-900 mb-2">Gasto Energético Total (GET)</h4>
                    <p className="text-2xl font-bold text-green-600">{result.tdee} kcal/dia</p>
                    <p className="text-sm text-gray-600 mt-1">
                      Energia total considerando atividade física ({result.activityLevel})
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-2">Interpretação dos Resultados</h4>
                  <div className="space-y-2 text-sm text-blue-700">
                    <p><strong>TMB:</strong> Representa o gasto energético mínimo para manter as funções vitais</p>
                    <p><strong>GET:</strong> Valor total de calorias necessárias por dia, incluindo atividades</p>
                    <p><strong>Aplicação:</strong> Use o GET como base para prescrições dietéticas</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Fórmula: Mifflin-St Jeor</Badge>
                  <Badge variant="secondary">Precisão: Alta</Badge>
                  <Badge variant="secondary">Aplicação: Clínica</Badge>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="harris" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Harris-Benedict</CardTitle>
              <CardDescription>Em desenvolvimento - Fórmula clássica para cálculo metabólico</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Esta calculadora estará disponível em breve.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dris" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>DRIs (Dietary Reference Intakes)</CardTitle>
              <CardDescription>Em desenvolvimento - Referências dietéticas</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Esta calculadora estará disponível em breve.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}