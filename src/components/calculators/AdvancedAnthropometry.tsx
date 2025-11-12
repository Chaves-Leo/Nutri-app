"use client"

import { useState } from "react"
import { Activity, Info, Save, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface AnthropometryResult {
  bmi: number
  bmiClassification: string
  idealWeight: { min: number; max: number }
  adjustedWeight?: number
  bodyFat?: number
  bodyFatClassification?: string
  muscleMass?: number
  recommendations: string[]
}

export function AdvancedAnthropometry() {
  const [activeTab, setActiveTab] = useState("basic")
  const [basicData, setBasicData] = useState({
    weight: "",
    height: "",
    age: "",
    gender: ""
  })
  
  const [circumferences, setCircumferences] = useState({
    arm: "",
    waist: "",
    hip: "",
    calf: ""
  })

  const [skinfolds, setSkinfolds] = useState({
    triceps: "",
    biceps: "",
    subscapular: "",
    suprailiac: "",
    abdominal: "",
    thigh: "",
    calf: ""
  })

  const [results, setResults] = useState<AnthropometryResult | null>(null)

  const calculateBMI = (weight: number, height: number): number => {
    return weight / Math.pow(height / 100, 2)
  }

  const getBMIClassification = (bmi: number): string => {
    if (bmi < 18.5) return "Baixo peso"
    if (bmi < 25) return "Peso normal"
    if (bmi < 30) return "Sobrepeso"
    if (bmi < 35) return "Obesidade grau I"
    if (bmi < 40) return "Obesidade grau II"
    return "Obesidade grau III"
  }

  const calculateIdealWeight = (height: number): { min: number; max: number } => {
    const heightM = height / 100
    return {
      min: Math.round(18.5 * Math.pow(heightM, 2)),
      max: Math.round(24.9 * Math.pow(heightM, 2))
    }
  }

  const calculateBodyFatPollock3 = (gender: string, age: number, triceps: number, suprailiac: number, thigh: number): number => {
    const sum = triceps + suprailiac + thigh
    let density = 0

    if (gender === "male") {
      density = 1.10938 - (0.0008267 * sum) + (0.0000016 * Math.pow(sum, 2)) - (0.0002574 * age)
    } else {
      density = 1.0994921 - (0.0009929 * sum) + (0.0000023 * Math.pow(sum, 2)) - (0.0001392 * age)
    }

    return (495 / density) - 450
  }

  const getBodyFatClassification = (bodyFat: number, gender: string, age: number): string => {
    // Classificação baseada em idade e sexo
    if (gender === "male") {
      if (age < 30) {
        if (bodyFat < 8) return "Muito baixo"
        if (bodyFat < 14) return "Baixo"
        if (bodyFat < 18) return "Normal"
        if (bodyFat < 25) return "Alto"
        return "Muito alto"
      } else {
        if (bodyFat < 11) return "Muito baixo"
        if (bodyFat < 17) return "Baixo"
        if (bodyFat < 22) return "Normal"
        if (bodyFat < 28) return "Alto"
        return "Muito alto"
      }
    } else {
      if (age < 30) {
        if (bodyFat < 16) return "Muito baixo"
        if (bodyFat < 20) return "Baixo"
        if (bodyFat < 25) return "Normal"
        if (bodyFat < 32) return "Alto"
        return "Muito alto"
      } else {
        if (bodyFat < 20) return "Muito baixo"
        if (bodyFat < 24) return "Baixo"
        if (bodyFat < 30) return "Normal"
        if (bodyFat < 36) return "Alto"
        return "Muito alto"
      }
    }
  }

  const handleCalculate = () => {
    const weight = parseFloat(basicData.weight)
    const height = parseFloat(basicData.height)
    const age = parseInt(basicData.age)

    const bmi = calculateBMI(weight, height)
    const bmiClassification = getBMIClassification(bmi)
    const idealWeight = calculateIdealWeight(height)

    let bodyFat: number | undefined
    let bodyFatClassification: string | undefined
    let recommendations: string[] = []

    // Calcular percentual de gordura se tiver dobras cutâneas
    if (skinfolds.triceps && skinfolds.suprailiac && skinfolds.thigh) {
      bodyFat = calculateBodyFatPollock3(
        basicData.gender,
        age,
        parseFloat(skinfolds.triceps),
        parseFloat(skinfolds.suprailiac),
        parseFloat(skinfolds.thigh)
      )
      bodyFatClassification = getBodyFatClassification(bodyFat, basicData.gender, age)
    }

    // Gerar recomendações
    if (bmi < 18.5) {
      recommendations.push("Considerar avaliação médica para investigar causas do baixo peso")
      recommendations.push("Plano alimentar hipercalórico com acompanhamento nutricional")
    } else if (bmi >= 25) {
      recommendations.push("Implementar plano alimentar hipocalórico balanceado")
      recommendations.push("Incluir atividade física regular")
      recommendations.push("Monitoramento regular do peso e composição corporal")
    } else {
      recommendations.push("Manter hábitos alimentares saudáveis")
      recommendations.push("Continuar atividade física regular")
    }

    if (bodyFat && bodyFatClassification) {
      if (bodyFatClassification.includes("Alto")) {
        recommendations.push("Foco em redução do percentual de gordura corporal")
        recommendations.push("Exercícios de resistência para preservar massa muscular")
      } else if (bodyFatClassification.includes("Baixo")) {
        recommendations.push("Monitorar adequação energética da dieta")
        recommendations.push("Avaliar necessidade de suplementação")
      }
    }

    const result: AnthropometryResult = {
      bmi: Math.round(bmi * 10) / 10,
      bmiClassification,
      idealWeight,
      bodyFat: bodyFat ? Math.round(bodyFat * 10) / 10 : undefined,
      bodyFatClassification,
      recommendations
    }

    setResults(result)
  }

  const isBasicFormValid = basicData.weight && basicData.height && basicData.age && basicData.gender

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Avaliação Antropométrica</h2>
        <p className="text-gray-600">Análise completa da composição corporal e estado nutricional</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="basic">Dados Básicos</TabsTrigger>
          <TabsTrigger value="circumferences">Circunferências</TabsTrigger>
          <TabsTrigger value="skinfolds">Dobras Cutâneas</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-6">
          <Card className="bg-white/70 backdrop-blur-sm border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Medidas Básicas
              </CardTitle>
              <CardDescription>
                Peso, altura, idade e sexo para cálculos fundamentais
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="weight">Peso (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    step="0.1"
                    placeholder="70.0"
                    value={basicData.weight}
                    onChange={(e) => setBasicData({ ...basicData, weight: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="height">Altura (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    step="0.1"
                    placeholder="170.0"
                    value={basicData.height}
                    onChange={(e) => setBasicData({ ...basicData, height: e.target.value })}
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
                    value={basicData.age}
                    onChange={(e) => setBasicData({ ...basicData, age: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="gender">Sexo</Label>
                  <Select value={basicData.gender} onValueChange={(value) => setBasicData({ ...basicData, gender: value })}>
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
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="circumferences" className="space-y-6">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              <strong>Circunferências:</strong> Medidas importantes para avaliação da distribuição de gordura corporal e risco cardiovascular.
            </AlertDescription>
          </Alert>

          <Card className="bg-white/70 backdrop-blur-sm border-0">
            <CardHeader>
              <CardTitle>Circunferências Corporais</CardTitle>
              <CardDescription>Medidas em centímetros (cm)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="arm">Circunferência do Braço (CB)</Label>
                  <Input
                    id="arm"
                    type="number"
                    step="0.1"
                    placeholder="30.0"
                    value={circumferences.arm}
                    onChange={(e) => setCircumferences({ ...circumferences, arm: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="waist">Circunferência da Cintura (CC)</Label>
                  <Input
                    id="waist"
                    type="number"
                    step="0.1"
                    placeholder="80.0"
                    value={circumferences.waist}
                    onChange={(e) => setCircumferences({ ...circumferences, waist: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="hip">Circunferência do Quadril (CQ)</Label>
                  <Input
                    id="hip"
                    type="number"
                    step="0.1"
                    placeholder="95.0"
                    value={circumferences.hip}
                    onChange={(e) => setCircumferences({ ...circumferences, hip: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="calf">Circunferência da Panturrilha (CP)</Label>
                  <Input
                    id="calf"
                    type="number"
                    step="0.1"
                    placeholder="35.0"
                    value={circumferences.calf}
                    onChange={(e) => setCircumferences({ ...circumferences, calf: e.target.value })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="skinfolds" className="space-y-6">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              <strong>Dobras Cutâneas:</strong> Para cálculo do percentual de gordura corporal usando a fórmula de Pollock (3 dobras: tríceps, suprailíaca e coxa).
            </AlertDescription>
          </Alert>

          <Card className="bg-white/70 backdrop-blur-sm border-0">
            <CardHeader>
              <CardTitle>Dobras Cutâneas</CardTitle>
              <CardDescription>Medidas em milímetros (mm)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="triceps">Tríceps *</Label>
                  <Input
                    id="triceps"
                    type="number"
                    step="0.1"
                    placeholder="15.0"
                    value={skinfolds.triceps}
                    onChange={(e) => setSkinfolds({ ...skinfolds, triceps: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="suprailiac">Suprailíaca *</Label>
                  <Input
                    id="suprailiac"
                    type="number"
                    step="0.1"
                    placeholder="20.0"
                    value={skinfolds.suprailiac}
                    onChange={(e) => setSkinfolds({ ...skinfolds, suprailiac: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="thigh">Coxa *</Label>
                  <Input
                    id="thigh"
                    type="number"
                    step="0.1"
                    placeholder="25.0"
                    value={skinfolds.thigh}
                    onChange={(e) => setSkinfolds({ ...skinfolds, thigh: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="subscapular">Subescapular</Label>
                  <Input
                    id="subscapular"
                    type="number"
                    step="0.1"
                    placeholder="18.0"
                    value={skinfolds.subscapular}
                    onChange={(e) => setSkinfolds({ ...skinfolds, subscapular: e.target.value })}
                  />
                </div>
              </div>

              <p className="text-sm text-gray-600">
                * Campos obrigatórios para cálculo do percentual de gordura (Pollock 3 dobras)
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-center">
        <Button 
          onClick={handleCalculate} 
          disabled={!isBasicFormValid}
          className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 px-8"
        >
          <Activity className="w-4 h-4 mr-2" />
          Calcular Antropometria
        </Button>
      </div>

      {/* Resultados */}
      {results && (
        <Card className="bg-white/70 backdrop-blur-sm border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Resultados da Avaliação
            </CardTitle>
            <CardDescription>
              Análise antropométrica completa e recomendações
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* IMC */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Índice de Massa Corporal</h4>
                <p className="text-3xl font-bold text-indigo-600">{results.bmi}</p>
                <Badge className={`mt-2 ${
                  results.bmiClassification === "Peso normal" ? "bg-green-100 text-green-700" :
                  results.bmiClassification.includes("Obesidade") ? "bg-red-100 text-red-700" :
                  "bg-yellow-100 text-yellow-700"
                }`}>
                  {results.bmiClassification}
                </Badge>
              </div>

              <div className="text-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Peso Ideal</h4>
                <p className="text-2xl font-bold text-emerald-600">
                  {results.idealWeight.min} - {results.idealWeight.max} kg
                </p>
                <p className="text-sm text-gray-600 mt-2">Baseado no IMC normal (18,5-24,9)</p>
              </div>
            </div>

            {/* Percentual de Gordura */}
            {results.bodyFat && (
              <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Percentual de Gordura Corporal</h4>
                <p className="text-3xl font-bold text-purple-600">{results.bodyFat}%</p>
                <Badge className={`mt-2 ${
                  results.bodyFatClassification === "Normal" ? "bg-green-100 text-green-700" :
                  results.bodyFatClassification?.includes("Alto") ? "bg-red-100 text-red-700" :
                  "bg-yellow-100 text-yellow-700"
                }`}>
                  {results.bodyFatClassification}
                </Badge>
                <p className="text-sm text-gray-600 mt-2">Fórmula de Pollock (3 dobras)</p>
              </div>
            )}

            {/* Recomendações */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Recomendações Nutricionais:</h4>
              <div className="space-y-2">
                {results.recommendations.map((recommendation, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center mt-0.5">
                      <span className="text-emerald-600 text-sm font-bold">{index + 1}</span>
                    </div>
                    <p className="text-gray-700">{recommendation}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="flex-1">
                <Save className="w-4 h-4 mr-2" />
                Salvar Avaliação
              </Button>
              <Button size="sm" variant="outline" className="flex-1">
                <TrendingUp className="w-4 h-4 mr-2" />
                Comparar Evolução
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}