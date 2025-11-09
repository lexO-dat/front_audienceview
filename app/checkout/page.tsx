"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ArrowLeft, CreditCard, Lock, CheckCircle, ShoppingBag, User, Mail, Phone, MapPin } from "lucide-react"
import { getItems, getItemsCount, type CartItem } from "@/lib/cartStore"

export default function CheckoutPage() {
  const [mounted, setMounted] = useState(false)
  const [items, setItems] = useState<CartItem[]>([])
  const [currentStep, setCurrentStep] = useState(1) // 1: Info, 2: Pago, 3: Confirmación
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderNumber, setOrderNumber] = useState("")

  // Datos del formulario
  const [formData, setFormData] = useState({
    // Información personal
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    // Dirección
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    // Información de pago
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true)
      setItems(getItems())
    }, 0)
    return () => clearTimeout(timer)
  }, [])

  const subtotal = items.reduce((acc, it) => acc + it.price * it.quantity, 0)
  const serviceFee = subtotal * 0.1
  const total = subtotal + serviceFee
  const totalItems = getItemsCount()

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const validateStep1 = () => {
    return (
      formData.firstName.trim() !== "" &&
      formData.lastName.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.phone.trim() !== ""
    )
  }

  const validateStep2 = () => {
    return (
      formData.cardNumber.trim() !== "" &&
      formData.cardName.trim() !== "" &&
      formData.expiryDate.trim() !== "" &&
      formData.cvv.trim() !== ""
    )
  }

  const handleNextStep = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2)
    } else if (currentStep === 2 && validateStep2()) {
      handlePayment()
    }
  }

  const handlePayment = async () => {
    setIsProcessing(true)
    // Simular procesamiento de pago
    await new Promise((resolve) => setTimeout(resolve, 2000))
    // Generar número de orden
    const newOrderNumber = Math.random().toString(36).substr(2, 9).toUpperCase()
    setOrderNumber(newOrderNumber)
    setIsProcessing(false)
    setCurrentStep(3)
  }

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="max-w-7xl mx-auto px-4 py-8 md:py-12">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-1/4"></div>
            <div className="h-64 bg-muted rounded"></div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (items.length === 0 && currentStep !== 3) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="max-w-7xl mx-auto px-4 py-8 md:py-12">
          <div className="text-center py-16">
            <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-bold mb-2">Tu carrito está vacío</h2>
            <p className="text-muted-foreground mb-6">
              Agrega algunos eventos antes de proceder al checkout
            </p>
            <Link href="/">
              <Button>Explorar Eventos</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        {/* Breadcrumb */}
        <Link
          href="/cart"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al carrito
        </Link>

        {/* Indicador de pasos */}
        <div className="flex items-center justify-center gap-4 mb-8">
          {[
            { num: 1, label: "Información" },
            { num: 2, label: "Pago" },
            { num: 3, label: "Confirmación" },
          ].map((step, idx) => (
            <div key={step.num} className="flex items-center gap-2">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full border-2 border-border flex items-center justify-center font-bold transition-all ${
                    step.num === currentStep
                      ? "bg-main text-main-foreground shadow-shadow"
                      : step.num < currentStep
                      ? "bg-foreground text-background"
                      : "bg-secondary-background text-foreground"
                  }`}
                >
                  {step.num < currentStep ? <CheckCircle className="w-5 h-5" /> : step.num}
                </div>
                <span className="text-xs mt-1 font-medium">{step.label}</span>
              </div>
              {idx < 2 && (
                <div
                  className={`w-16 md:w-24 h-1 border-2 border-border mb-5 ${
                    step.num < currentStep ? "bg-foreground" : "bg-secondary-background"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Formulario de checkout */}
          <div className="lg:col-span-2">
            {currentStep === 1 && (
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <User className="w-6 h-6 text-main" />
                  Información Personal
                </h2>

                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Nombre *</label>
                      <Input
                        type="text"
                        placeholder="Juan"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Apellido *</label>
                      <Input
                        type="text"
                        placeholder="Pérez"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="flex text-sm font-semibold mb-2 items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Correo Electrónico *
                    </label>
                    <Input
                      type="email"
                      placeholder="juan.perez@ejemplo.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Recibirás tus tickets en este correo
                    </p>
                  </div>

                  <div>
                    <label className="flex text-sm font-semibold mb-2 items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Teléfono *
                    </label>
                    <Input
                      type="tel"
                      placeholder="+1 234 567 8900"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                    />
                  </div>

                  <div className="pt-4 border-t-2 border-border">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-main" />
                      Dirección de Facturación (Opcional)
                    </h3>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold mb-2">Dirección</label>
                        <Input
                          type="text"
                          placeholder="Calle Principal 123"
                          value={formData.address}
                          onChange={(e) => handleInputChange("address", e.target.value)}
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold mb-2">Ciudad</label>
                          <Input
                            type="text"
                            placeholder="Ciudad"
                            value={formData.city}
                            onChange={(e) => handleInputChange("city", e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold mb-2">Estado/Provincia</label>
                          <Input
                            type="text"
                            placeholder="Estado"
                            value={formData.state}
                            onChange={(e) => handleInputChange("state", e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold mb-2">Código Postal</label>
                          <Input
                            type="text"
                            placeholder="12345"
                            value={formData.zipCode}
                            onChange={(e) => handleInputChange("zipCode", e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold mb-2">País</label>
                          <Input
                            type="text"
                            placeholder="País"
                            value={formData.country}
                            onChange={(e) => handleInputChange("country", e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-6 pt-6 border-t-2 border-border">
                  <Button
                    onClick={handleNextStep}
                    disabled={!validateStep1()}
                    className="flex-1"
                  >
                    Continuar al Pago
                  </Button>
                </div>
              </Card>
            )}

            {currentStep === 2 && (
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <CreditCard className="w-6 h-6 text-main" />
                  Información de Pago
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Número de Tarjeta *</label>
                    <Input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      value={formData.cardNumber}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\s/g, "")
                        const formatted = value.match(/.{1,4}/g)?.join(" ") || value
                        handleInputChange("cardNumber", formatted)
                      }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Nombre en la Tarjeta *</label>
                    <Input
                      type="text"
                      placeholder="JUAN PEREZ"
                      value={formData.cardName}
                      onChange={(e) => handleInputChange("cardName", e.target.value.toUpperCase())}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Fecha de Expiración *</label>
                      <Input
                        type="text"
                        placeholder="MM/AA"
                        maxLength={5}
                        value={formData.expiryDate}
                        onChange={(e) => {
                          let value = e.target.value.replace(/\D/g, "")
                          if (value.length >= 2) {
                            value = value.slice(0, 2) + "/" + value.slice(2, 4)
                          }
                          handleInputChange("expiryDate", value)
                        }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">CVV *</label>
                      <Input
                        type="text"
                        placeholder="123"
                        maxLength={4}
                        value={formData.cvv}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, "")
                          handleInputChange("cvv", value)
                        }}
                      />
                    </div>
                  </div>

                  <div className="p-4 bg-main/10 border-2 border-border rounded-base">
                    <div className="flex items-start gap-2">
                      <Lock className="w-5 h-5 text-main mt-0.5 shrink-0" />
                      <div>
                        <p className="font-bold text-sm mb-1">Pago 100% Seguro</p>
                        <p className="text-xs text-foreground/70">
                          Tu información está protegida con encriptación SSL de 256 bits
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-6 pt-6 border-t-2 border-border">
                  <Button
                    variant="neutral"
                    onClick={() => setCurrentStep(1)}
                    className="flex-1"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Volver
                  </Button>
                  <Button
                    onClick={handleNextStep}
                    disabled={!validateStep2() || isProcessing}
                    className="flex-1"
                  >
                    {isProcessing ? (
                      <>
                        <span className="animate-spin mr-2">⏳</span>
                        Procesando...
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        Realizar Pago
                      </>
                    )}
                  </Button>
                </div>
              </Card>
            )}

            {currentStep === 3 && (
              <Card className="p-8 text-center">
                <div className="w-20 h-20 bg-main rounded-full flex items-center justify-center mx-auto mb-6 shadow-shadow">
                  <CheckCircle className="w-12 h-12 text-main-foreground" />
                </div>

                <h2 className="text-3xl font-bold mb-3">¡Compra Exitosa!</h2>
                <p className="text-lg text-foreground/70 mb-6">
                  Tu orden ha sido confirmada
                </p>

                <div className="bg-main/10 border-2 border-border rounded-base p-6 mb-6">
                  <p className="text-sm font-semibold mb-2">Número de Orden</p>
                  <p className="text-2xl font-bold text-main">
                    #{orderNumber}
                  </p>
                </div>

                <div className="space-y-3 text-sm text-left bg-secondary-background border-2 border-border rounded-base p-4 mb-6">
                  <p className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-main" />
                    <span>
                      Hemos enviado la confirmación a <strong>{formData.email}</strong>
                    </span>
                  </p>
                  <p className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-main" />
                    <span>Tus tickets han sido enviados por correo electrónico</span>
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href="/" className="flex-1">
                    <Button variant="neutral" className="w-full">
                      Volver a Inicio
                    </Button>
                  </Link>
                  <Link href="/recommendations" className="flex-1">
                    <Button className="w-full">
                      Ver Recomendaciones
                    </Button>
                  </Link>
                </div>
              </Card>
            )}
          </div>

          {/* Resumen del pedido */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-6">Resumen del Pedido</h2>

              {/* Items */}
              <div className="space-y-4 mb-6 max-h-80 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3 pb-4 border-b border-border">
                    <div className="relative w-16 h-16 rounded-base overflow-hidden shrink-0 bg-muted border-2 border-border">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm truncate">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.category}</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs">Cantidad: {item.quantity}</span>
                        <span className="text-sm font-bold text-main">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totales */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal ({totalItems} tickets)</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Comisión de servicio (10%)</span>
                  <span className="font-semibold">${serviceFee.toFixed(2)}</span>
                </div>
                <div className="border-t-2 border-border pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">Total</span>
                    <span className="text-2xl font-bold text-main">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {currentStep !== 3 && (
                <div className="p-4 bg-main/10 border-2 border-border rounded-base">
                  <p className="text-xs text-foreground/70">
                    <strong>💡 Nota:</strong> Los tickets se enviarán a tu correo electrónico
                    inmediatamente después de completar el pago.
                  </p>
                </div>
              )}
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}