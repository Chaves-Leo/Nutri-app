"use client"

import { useState } from "react"
import { Ruler, Calculator, User, Activity } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

interface AnthropometryResult {
  imc: number
  imcClassification: string
  cb: number
  cbPercentile?: number
  cp: number
  cpClassification?: string
  aj: number
  ajClassification?: string
}

export function AnthropometryCalculator() {
  const [weight, setWeight] = useState("")
  const [height, setHeight] = useState("")
  const [age, setAge] = useState("")
  const [gender, setGender] = useState("")
  const [cb, setCb] = useState("") // Circunferência do Braço
  const [cp, setCp] = useState("") // Circunferência da Panturrilha
  const [aj, setAj] = useState("") // Altura do Joelho
  const [result, setResult] = useState<AnthropometryResult | null>(null)

  const getIMCClassification = (imc: number): string => {
    if (imc < 18.5) return "Baixo peso"
    if (imc < 25) return "Peso normal"
    if (imc < 30) return "Sobrepeso"
    if (imc < 35) return "Obesidade grau I"
    if (imc < 40) return "Obesidade grau II"
    return "Obesidade grau III"
  }

  const getCPClassification = (cp: number, gender: string): string => {
    if (gender === "male") {
      if (cp < 31) return "Depleção muscular"
      return "Adequado"
    } else {
      if (cp < 33) return "Depleção muscular"
      return "Adequado"
    }
  }

  const getAJClassification = (aj: number, gender: string): string => {
    // Classificação baseada em percentis para idosos
    if (gender === "male") {
      if (aj < 49) return "Baixa estatura"
      if (aj > 57) return "Alta estatura"
      return "Estatura normal"
    } else {
      if (aj < 45) return "Baixa estatura"
      if (aj > 53) return "Alta estatura"
      return "Estatura normal"
    }
  }

  const calculateAnthropometry = () => {
    if (!weight || !height) {
      alert("Por favor, preencha pelo menos peso e altura")
      return
    }

    const w = parseFloat(weight)
    const h = parseFloat(height) / 100 // converter cm para m
    const imc = w / (h * h)
    const imcClassification = getIMCClassification(imc)

    const cbValue = cb ? parseFloat(cb) : 0
    const cpValue = cp ? parseFloat(cp) : 0
    const ajValue = aj ? parseFloat(aj) : 0

    const cpClassification = cp && gender ? getCPClassification(cpValue, gender) : undefined
    const ajClassification = aj && gender ? getAJClassification(ajValue, gender) : undefined

    setResult({
      imc: Math.round(imc * 10) / 10,
      imcClassification,
      cb: cbValue,
      cp: cpValue,
      cpClassification,
      aj: ajValue,
      ajClassification
    })
  }

  const clearForm = () => {
    setWeight("")
    setHeight("")
    setAge("")
    setGender("")
    setCb("")
    setCp("")
    setAj("")
    setResult(null)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Avaliação Antropométrica</h2>
        <p className="text-gray-600">Calcule IMC e avalie medidas antropométricas importantes</p>
      </div>

      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="basic">Básica</TabsTrigger>
          <TabsTrigger value="skinfolds">Dobras Cutâneas</TabsTrigger>
          <TabsTrigger value="bioimpedance">Bioimpedância</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Ruler className="w-5 h-5 text-green-600" />
                Medidas Antropométricas Básicas
              </CardTitle>
              <CardDescription>
                IMC, circunferências e medidas de comprimento
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Dados Básicos */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Dados Básicos
                  </h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="weight">Peso (kg) *</Label>
                    <Input
                      id="weight"
                      type="number"
                      placeholder="Ex: 70"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="height">Altura (cm) *</Label>
                    <Input
                      id="height"
                      type="number"
                      placeholder="Ex: 175"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="age">Idade (anos)</Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="Ex: 30"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                    />
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

                {/* Medidas Específicas */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <Activity className="w-4 h-4" />
                    Medidas Específicas
                  </h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="cb">Circunferência do Braço - CB (cm)</Label>
                    <Input
                      id="cb"
                      type="number"
                      placeholder="Ex: 28"
                      value={cb}
                      onChange={(e) => setCb(e.target.value)}
                    />
                    <p className="text-xs text-gray-500">Medida no ponto médio entre acrômio e olécrano</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cp">Circunferência da Panturrilha - CP (cm)</Label>
                    <Input
                      id="cp"
                      type="number"
                      placeholder="Ex: 35"
                      value={cp}
                      onChange={(e) => setCp(e.target.value)}
                    />
                    <p className="text-xs text-gray-500">Maior circunferência da panturrilha</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="aj">Altura do Joelho - AJ (cm)</Label>
                    <Input
                      id="aj"
                      type="number"
                      placeholder="Ex: 52"
                      value={aj}
                      onChange={(e) => setAj(e.target.value)}
                    />
                    <p className="text-xs text-gray-500">Distância do calcanhar à superfície anterior da coxa</p>
                  </div>

                  <div className="p-3 bg-yellow-50 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      <strong>Dica:</strong> As medidas específicas são opcionais, mas importantes para avaliação nutricional completa.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button onClick={calculateAnthropometry} className="flex-1 bg-green-600 hover:bg-green-700">
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
                <CardTitle className="text-green-800">Resultados da Avaliação</CardTitle>
                <CardDescription className="text-green-600">
                  Interpretação das medidas antropométricas
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* IMC */}
                <div className="p-4 bg-white rounded-lg border border-green-200">
                  <h4 className="font-semibold text-gray-900 mb-2">Índice de Massa Corporal (IMC)</h4>
                  <div className="flex items-center gap-4">
                    <p className="text-2xl font-bold text-green-600">{result.imc} kg/m²</p>
                    <Badge variant={result.imc >= 18.5 && result.imc < 25 ? "default" : "secondary"}>
                      {result.imcClassification}
                    </Badge>
                  </div>
                </div>

                {/* Medidas Específicas */}
                {(result.cb > 0 || result.cp > 0 || result.aj > 0) && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {result.cb > 0 && (
                      <div className="p-4 bg-white rounded-lg border border-green-200">
                        <h4 className="font-semibold text-gray-900 mb-2">CB</h4>
                        <p className="text-xl font-bold text-green-600">{result.cb} cm</p>
                        <p className="text-sm text-gray-600">Circunferência do Braço</p>
                      </div>
                    )}

                    {result.cp > 0 && (
                      <div className="p-4 bg-white rounded-lg border border-green-200">
                        <h4 className="font-semibold text-gray-900 mb-2">CP</h4>
                        <p className="text-xl font-bold text-green-600">{result.cp} cm</p>
                        <p className="text-sm text-gray-600">Circunferência da Panturrilha</p>
                        {result.cpClassification && (
                          <Badge variant="secondary" className="mt-1">
                            {result.cpClassification}
                          </Badge>
                        )}
                      </div>
                    )}

                    {result.aj > 0 && (
                      <div className="p-4 bg-white rounded-lg border border-green-200">
                        <h4 className="font-semibold text-gray-900 mb-2">AJ</h4>
                        <p className="text-xl font-bold text-green-600">{result.aj} cm</p>
                        <p className="text-sm text-gray-600">Altura do Joelho</p>
                        {result.ajClassification && (
                          <Badge variant="secondary" className="mt-1">
                            {result.ajClassification}
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>
                )}

                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-2">Interpretação Clínica</h4>
                  <div className="space-y-2 text-sm text-blue-700">
                    <p><strong>IMC:</strong> Indicador de estado nutricional baseado na relação peso/altura</p>
                    <p><strong>CB:</strong> Avalia reserva muscular e adiposa do braço</p>
                    <p><strong>CP:</strong> Importante para avaliação de sarcopenia em idosos</p>
                    <p><strong>AJ:</strong> Útil para estimar estatura quando não é possível medir diretamente</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Avaliação: Antropométrica</Badge>
                  <Badge variant="secondary">Aplicação: Clínica</Badge>
                  <Badge variant="secondary">Referência: WHO/OMS</Badge>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="skinfolds" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Dobras Cutâneas</CardTitle>
              <CardDescription>Em desenvolvimento - Avaliação da composição corporal por dobras</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Esta funcionalidade incluirá:</p>
              <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                <li>Protocolo de 3 dobras (Jackson & Pollock)</li>
                <li>Protocolo de 7 dobras</li>
                <li>Fórmulas específicas por idade e sexo</li>
                <li>Cálculo de percentual de gordura</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bioimpedance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Bioimpedância</CardTitle>
              <CardDescription>Em desenvolvimento - Análise de composição corporal</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Esta funcionalidade incluirá:</p>
              <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                <li>Interpretação de resultados de bioimpedância</li>
                <li>Análise de massa magra e massa gorda</li>
                <li>Água corporal total</li>
                <li>Taxa metabólica basal por bioimpedância</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}