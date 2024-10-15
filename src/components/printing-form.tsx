"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "@/hooks/use-toast"
import { Icons } from "@/components/icons"

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  phoneNumber: z.string().regex(/^\d{10}$/, { message: "Invalid phone number. Must be 10 digits." }),
  document: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, "Document is required.")
    .refine(
      (files) => ["application/pdf", "image/jpeg", "image/png"].includes(files[0]?.type),
      "File must be a PDF, JPEG, or PNG."
    ),
  copies: z.number().int().positive().max(100, { message: "Maximum 100 copies allowed." }),
  printType: z.enum(["color", "blackAndWhite"], {
    required_error: "Please select a print type.",
  }),
})

export function PrintingFormComponent() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  })



  const onSubmit = async (data:any) => {
    setIsSubmitting(true)
    // Simulate API call
   
    await new Promise((resolve) => setTimeout(resolve, 2000))
    console.log(data)
    toast({
      title: "Order Submitted",
      description: "Your printing order has been successfully submitted.",
    })
    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Printing Service</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Fill out the form below to submit your printing order
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <Label htmlFor="name" className="sr-only">
                Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Name"
                {...register("name")}
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name?.message && <p className="mt-1 text-xs text-red-500">{errors.name.message as string}</p>}
            </div>
            <div className="mt-4 pt-4">
              <Label htmlFor="phoneNumber" className="sr-only">
                Phone Number
              </Label>
              <Input
                id="phoneNumber"
                type="tel"
                placeholder="Phone Number"
                {...register("phoneNumber")}
                className={errors.phoneNumber ? "border-red-500" : ""}
              />
              {errors.phoneNumber && <p className="mt-1 text-xs text-red-500">{errors.phoneNumber.message as string}</p>}
            </div>
          </div>

          <div>
            <Label htmlFor="document" className="block text-sm font-medium text-gray-700">
              Upload Document (PDF, JPEG, or PNG)
            </Label>
            <Input
              id="document"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              {...register("document")}
              className={`mt-1 ${errors.document ? "border-red-500" : ""}`}
            />
            {errors.document && <p className="mt-1 text-xs text-red-500">{errors.document.message as string}</p>}
          </div>

          <div>
            <Label htmlFor="copies" className="block text-sm font-medium text-gray-700">
              Number of Copies
            </Label>
            <Input
              id="copies"
              type="number"
              min="1"
              max="100"
              {...register("copies", { valueAsNumber: true })}
              className={`mt-1 ${errors.copies ? "border-red-500" : ""}`}
            />
            {errors.copies && <p className="mt-1 text-xs text-red-500">{errors.copies.message as string}</p>}
          </div>

          <div>
            <Label className="block text-sm font-medium text-gray-700">Print Type</Label>
            <RadioGroup defaultValue="color" className="mt-2" {...register("printType")}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="color" id="color" />
                <Label htmlFor="color">Color</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="blackAndWhite" id="blackAndWhite" />
                <Label htmlFor="blackAndWhite">Black and White</Label>
              </div>
            </RadioGroup>
            {errors.printType && <p className="mt-1 text-xs text-red-500">{errors.printType.message as string}</p>}
          </div>

          <div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Submit and Pay"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}