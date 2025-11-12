"use client"

import { useState } from "react"
import { Calculator, Info, Save, History } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface CalculationResult {
  formula: string
  bmr: number
  tdee: number
  recommendations: {
    weightLoss: number
    maintenance: number
    weightGain: number
  }
}

export function EnergyCalculator() {
  const [formData, setFormData] = useState({
    weight: "",
    height: "",
    age: "",
    gender: "",
    activityLevel: "",
    goal: ""
  })
  
  const [results, setResults] = useState<CalculationResult | null>(null)
  const [activeFormula, setActiveFormula] = useState("mifflin")

  const activityFactors = {
    sedentary: { value: 1.2, label: "Sedentário (pouco ou nenhum exercício)" },
    light: { value: 1.375, label: "Levemente ativo (exercício leve 1-3 dias/semana)" },
    moderate: { value: 1.55, label: "Moderadamente ativo (exercício moderado 3-5 dias/semana)" },
    very: { value: 1.725, label: "Muito ativo (exercício pesado 6-7 dias/semana)" },
    extra: { value: 1.9, label: "Extremamente ativo (exercício muito pesado, trabalho físico)" }
  }

  const calculateMifflin = (weight: number, height: number, age: number, gender: string): number => {
    const base = (10 * weight) + (6.25 * height) - (5 * age)
    return gender === "male" ? base + 5 : base - 161
  }

  const calculateHarrisBenedict = (weight: number, height: number, age: number, gender: string): number => {
    if (gender === "male") {
      return 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age)
    } else {
      return 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age)
    }
  }

  const calculateDRI = (weight: number, height: number, age: number, gender: string): number => {
    // Simplified DRI calculation
    if (gender === "male") {
      return 662 - (9.53 * age) + 1.0 * ((15.91 * weight) + (539.6 * height / 100))
    } else {
      return 354 - (6.91 * age) + 1.0 * ((9.36 * weight) + (726 * height / 100))
    }
  }

  const handleCalculate = () => {
    const weight = parseFloat(formData.weight)
    const height = parseFloat(formData.height)
    const age = parseInt(formData.age)
    const activityFactor = activityFactors[formData.activityLevel as keyof typeof activityFactors]?.value || 1.2

    let bmr = 0
    let formulaName = ""

    switch (activeFormula) {
      case "mifflin":
        bmr = calculateMifflin(weight, height, age, formData.gender)
        formulaName = "Mifflin-St Jeor"
        break
      case "harris":
        bmr = calculateHarrisBenedict(weight, height, age, formData.gender)
        formulaName = "Harris-Benedict"
        break
      case "dri":
        bmr = calculateDRI(weight, height, age, formData.gender)
        formulaName = "DRI (EER)"
        break
    }

    const tdee = bmr * activityFactor

    const result: CalculationResult = {
      formula: formulaName,
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      recommendations: {
        weightLoss: Math.round(tdee - 500),
        maintenance: Math.round(tdee),
        weightGain: Math.round(tdee + 500)
      }
    }

    setResults(result)
  }

  const isFormValid = formData.weight && formData.height && formData.age && formData.gender && formData.activityLevel

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Calculadoras Energéticas</h2>
        <p className="text-gray-600">Calcule o gasto energético usando diferentes fórmulas validadas</p>
      </div>

      <Tabs value={activeFormula} onValueChange={setActiveFormula} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="mifflin">Mifflin-St Jeor</TabsTrigger>
          <TabsTrigger value="harris">Harris-Benedict</TabsTrigger>
          <TabsTrigger value="dri">DRI (EER)</TabsTrigger>
        </TabsList>

        <TabsContent value="mifflin" className="space-y-6">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              <strong>Mifflin-St Jeor:</strong> Considerada a mais precisa para a população geral. 
              Desenvolvida em 1990, é amplamente recomendada por profissionais de saúde.
            </AlertDescription>
          </Alert>
        </TabsContent>

        <TabsContent value="harris" className="space-y-6">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              <strong>Harris-Benedict:</strong> Fórmula clássica desenvolvida em 1919 e revisada em 1984. 
              Pode superestimar o gasto energético em algumas populações.
            </AlertDescription>
          </Alert>
        </TabsContent>

        <TabsContent value="dri" className="space-y-6">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              <strong>DRI (EER):</strong> Estimated Energy Requirement das Dietary Reference Intakes. 
              Considera idade, sexo, peso, altura e nível de atividade física.
            </AlertDescription>
          </Alert>
        </TabsContent>
      </Tabs>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Formulário */}
        <Card className="bg-white/70 backdrop-blur-sm border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="w-5 h-5" />
              Dados do Paciente
            </CardTitle>
            <CardDescription>
              Preencha os dados para calcular o gasto energético
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="weight">Peso (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="70"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="height">Altura (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  placeholder="170"
                  value={formData.height}
                  onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="age">Idade (anos)</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="30"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="gender">Sexo</Label>
                <Select value={formData.gender} onValueChange={(value) => setFormData({ ...formData, gender: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Masculino</SelectItem>
                    <SelectItem value="female">Feminino</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="activity">Nível de Atividade Física</Label>
              <Select value={formData.activityLevel} onValueChange={(value) => setFormData({ ...formData, activityLevel: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o nível de atividade" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(activityFactors).map(([key, { value, label }]) => (
                    <SelectItem key={key} value={key}>
                      {label} ({value})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="goal">Objetivo</Label>
              <Select value={formData.goal} onValueChange={(value) => setFormData({ ...formData, goal: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o objetivo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="loss">Perda de peso</SelectItem>
                  <SelectItem value="maintenance">Manutenção</SelectItem>
                  <SelectItem value="gain">Ganho de peso</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button 
              onClick={handleCalculate} 
              disabled={!isFormValid}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
            >
              Calcular Gasto Energético
            </Button>
          </CardContent>
        </Card>

        {/* Resultados */}
        <Card className="bg-white/70 backdrop-blur-sm border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="w-5 h-5" />
              Resultados
            </CardTitle>
            <CardDescription>
              Valores calculados e recomendações nutricionais
            </CardDescription>
          </CardHeader>
          <CardContent>
            {results ? (
              <div className="space-y-6">
                <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                  <Badge className="mb-2">{results.formula}</Badge>
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm text-gray-600">Taxa Metabólica Basal (TMB)</p>
                      <p className="text-2xl font-bold text-gray-900">{results.bmr} kcal/dia</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Gasto Energético Total (GET)</p>
                      <p className="text-3xl font-bold text-indigo-600">{results.tdee} kcal/dia</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Recomendações Calóricas:</h4>
                  
                  <div className="grid gap-3">
                    <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                      <div>
                        <p className="font-medium text-red-800">Perda de Peso</p>
                        <p className="text-sm text-red-600">Déficit de 500 kcal/dia</p>
                      </div>
                      <p className="text-lg font-bold text-red-800">{results.recommendations.weightLoss} kcal</p>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div>
                        <p className="font-medium text-green-800">Manutenção</p>
                        <p className="text-sm text-green-600">Manter peso atual</p>
                      </div>
                      <p className="text-lg font-bold text-green-800">{results.recommendations.maintenance} kcal</p>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div>
                        <p className="font-medium text-blue-800">Ganho de Peso</p>
                        <p className="text-sm text-blue-600">Superávit de 500 kcal/dia</p>
                      </div>
                      <p className="text-lg font-bold text-blue-800">{results.recommendations.weightGain} kcal</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Save className="w-4 h-4 mr-2" />
                    Salvar Resultado
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <History className="w-4 h-4 mr-2" />
                    Histórico
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <Calculator className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Preencha os dados para ver os resultados</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}