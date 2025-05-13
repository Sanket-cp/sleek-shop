
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreditCard } from "lucide-react";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  cardName: z.string().min(1, "Card holder name is required"),
  cardNumber: z.string().min(16, "Card number must be 16 digits").max(16, "Card number must be 16 digits"),
  expiryMonth: z.string().min(1, "Expiry month is required"),
  expiryYear: z.string().min(1, "Expiry year is required"),
  cvv: z.string().min(3, "CVV must be 3 digits").max(3, "CVV must be 3 digits"),
});

export const PaymentMethodSection = () => {
  const [savedCards, setSavedCards] = useState<{name: string, last4: string, type: string}[]>([
    { name: "Amit Kumar", last4: "4242", type: "visa" },
    { name: "Priya Sharma", last4: "5678", type: "mastercard" }
  ]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cardName: "",
      cardNumber: "",
      expiryMonth: "",
      expiryYear: "",
      cvv: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Get card type based on first digit
    let cardType = "unknown";
    if (values.cardNumber.startsWith("4")) cardType = "visa";
    else if (values.cardNumber.startsWith("5")) cardType = "mastercard";
    else if (values.cardNumber.startsWith("3")) cardType = "amex";
    
    // Add new card to saved cards
    setSavedCards([...savedCards, { 
      name: values.cardName, 
      last4: values.cardNumber.slice(-4),
      type: cardType
    }]);

    // Show success message
    toast({
      title: "Card Added",
      description: `Card ending in ${values.cardNumber.slice(-4)} has been saved to your account.`,
      variant: "default",
    });

    // Reset form
    form.reset();
  };

  const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
  const currentYear = new Date().getFullYear();
  const years = Array.from({length: 10}, (_, i) => (currentYear + i).toString());

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <CreditCard className="h-5 w-5 mr-2" /> Saved Payment Methods
      </h2>
      
      {savedCards.length > 0 && (
        <div className="mb-6 space-y-3">
          {savedCards.map((card, index) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded-md bg-gray-50 hover:bg-gray-100">
              <div className="flex items-center">
                {card.type === "visa" && (
                  <div className="w-10 h-6 bg-blue-700 rounded mr-3 flex items-center justify-center text-white text-xs font-bold">VISA</div>
                )}
                {card.type === "mastercard" && (
                  <div className="w-10 h-6 bg-red-600 rounded mr-3 flex items-center justify-center text-white text-xs font-bold">MC</div>
                )}
                <div>
                  <div className="font-medium">{card.name}</div>
                  <div className="text-sm text-gray-600">•••• •••• •••• {card.last4}</div>
                </div>
              </div>
              <Button variant="outline" size="sm">Use</Button>
            </div>
          ))}
        </div>
      )}

      <div className="border-t pt-4">
        <h3 className="font-medium mb-4">Add New Card</h3>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="cardName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cardholder Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Cardholder Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="cardNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Card Number</FormLabel>
                  <FormControl>
                    <Input placeholder="1234 5678 9012 3456" {...field} maxLength={16} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="expiryMonth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Month</FormLabel>
                    <FormControl>
                      <select
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        {...field}
                      >
                        <option value="">Month</option>
                        {months.map((month) => (
                          <option key={month} value={month}>{month}</option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="expiryYear"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Year</FormLabel>
                    <FormControl>
                      <select
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        {...field}
                      >
                        <option value="">Year</option>
                        {years.map((year) => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="cvv"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CVV</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="123" maxLength={3} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <Button type="submit" className="w-full bg-brand-purple hover:bg-opacity-90">
              Add Card
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
