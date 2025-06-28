
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check, Globe } from "lucide-react";

interface Country {
  code: string;
  name: string;
  currency: string;
  symbol: string;
  flag: string;
}

interface ExchangeRates {
  [key: string]: number;
}

const countries: Country[] = [
  { code: "US", name: "United States", currency: "USD", symbol: "$", flag: "🇺🇸" },
  { code: "IN", name: "India", currency: "INR", symbol: "₹", flag: "🇮🇳" },
  { code: "GB", name: "United Kingdom", currency: "GBP", symbol: "£", flag: "🇬🇧" },
  { code: "EU", name: "European Union", currency: "EUR", symbol: "€", flag: "🇪🇺" },
  { code: "CA", name: "Canada", currency: "CAD", symbol: "C$", flag: "🇨🇦" },
  { code: "AU", name: "Australia", currency: "AUD", symbol: "A$", flag: "🇦🇺" },
  { code: "SG", name: "Singapore", currency: "SGD", symbol: "S$", flag: "🇸🇬" },
  { code: "JP", name: "Japan", currency: "JPY", symbol: "¥", flag: "🇯🇵" },
];

// Base prices in INR
const basePrices = {
  monthly: 999,
  oneTime: 2999
};

// Mock exchange rates (in a real app, you'd fetch from an API)
const mockExchangeRates: ExchangeRates = {
  USD: 0.012,
  INR: 1,
  GBP: 0.0095,
  EUR: 0.011,
  CAD: 0.016,
  AUD: 0.018,
  SGD: 0.016,
  JPY: 1.8
};

const PricingCalculator = () => {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates>(mockExchangeRates);
  const [isLoading, setIsLoading] = useState(false);

  // Auto-detect user's country (simplified)
  useEffect(() => {
    // In a real app, you'd use a geolocation API
    setSelectedCountry(countries.find(c => c.code === "IN") || countries[0]);
  }, []);

  const convertPrice = (priceInINR: number, targetCurrency: string): number => {
    const rate = exchangeRates[targetCurrency] || 1;
    const convertedPrice = priceInINR * rate;
    
    // Round to appropriate decimal places based on currency
    if (targetCurrency === "JPY") {
      return Math.round(convertedPrice);
    }
    return Math.round(convertedPrice * 100) / 100;
  };

  const formatPrice = (price: number, currency: string, symbol: string): string => {
    if (currency === "JPY") {
      return `${symbol}${price.toLocaleString()}`;
    }
    return `${symbol}${price.toFixed(2)}`;
  };

  const getConvertedPrices = () => {
    if (!selectedCountry) return null;

    const monthlyPrice = convertPrice(basePrices.monthly, selectedCountry.currency);
    const oneTimePrice = convertPrice(basePrices.oneTime, selectedCountry.currency);

    return {
      monthly: {
        original: monthlyPrice,
        formatted: formatPrice(monthlyPrice, selectedCountry.currency, selectedCountry.symbol)
      },
      oneTime: {
        original: oneTimePrice,
        formatted: formatPrice(oneTimePrice, selectedCountry.currency, selectedCountry.symbol)
      }
    };
  };

  const convertedPrices = getConvertedPrices();

  return (
    <div className="space-y-6">
      {/* Country Selector */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 mb-4">
          <Globe className="h-5 w-5 text-indigo-600" />
          <h3 className="text-lg font-semibold text-[#1A1A1A]">
            Select Your Country for Localized Pricing
          </h3>
        </div>
        <Select 
          value={selectedCountry?.code} 
          onValueChange={(value) => {
            const country = countries.find(c => c.code === value);
            setSelectedCountry(country || null);
          }}
        >
          <SelectTrigger className="w-64 mx-auto">
            <SelectValue placeholder="Choose your country" />
          </SelectTrigger>
          <SelectContent>
            {countries.map((country) => (
              <SelectItem key={country.code} value={country.code}>
                <div className="flex items-center gap-2">
                  <span>{country.flag}</span>
                  <span>{country.name}</span>
                  <span className="text-gray-500">({country.currency})</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Pricing Cards */}
      {selectedCountry && convertedPrices && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {/* Content Relay Plan */}
          <Card className="sketch-card bg-white relative">
            <CardHeader className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-2">
                <CardTitle className="text-xl sm:text-2xl font-bold text-[#1A1A1A]">
                  Content Relay Workflow 📝
                </CardTitle>
                <div className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium self-start">
                  Popular
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-3xl sm:text-4xl font-bold text-[#1A1A1A]">
                    {convertedPrices.monthly.formatted}
                  </span>
                  <span className="text-gray-600">/month</span>
                </div>
                {selectedCountry.code !== "IN" && (
                  <p className="text-sm text-gray-500">
                    (₹{basePrices.monthly} INR equivalent)
                  </p>
                )}
              </div>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                <div className="flex items-start space-x-3">
                  <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-gray-700">Full automation workflow setup using n8n + AI Agent</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-gray-700">Powered by Google Gemini AI</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-gray-700">No-code system with auto-posting</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-gray-700">Monthly workflow upgrades + onboarding support</span>
                </div>
              </div>
              <Button 
                className="w-full custom-gradient-bg text-white sketch-button border-2 border-black hover:bg-gradient-to-br hover:from-indigo-700 hover:to-purple-700 text-sm sm:text-base py-2 sm:py-3"
                onClick={() => window.open('https://forms.gle/mTjevZH57N6PGvHdA', '_blank')}
              >
                Get Your Workflow Built 🎯
              </Button>
            </CardContent>
          </Card>

          {/* Automation Expert Plan */}
          <Card className="sketch-card bg-white relative">
            <CardHeader className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-2">
                <CardTitle className="text-xl sm:text-2xl font-bold text-[#1A1A1A]">
                  Automation Expert Workflow 🤖
                </CardTitle>
                <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium self-start">
                  One-time
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-3xl sm:text-4xl font-bold text-[#1A1A1A]">
                    {convertedPrices.oneTime.formatted}
                  </span>
                  <span className="text-gray-600">one-time</span>
                </div>
                {selectedCountry.code !== "IN" && (
                  <p className="text-sm text-gray-500">
                    (₹{basePrices.oneTime} INR equivalent)
                  </p>
                )}
              </div>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                <div className="flex items-start space-x-3">
                  <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-gray-700">Full automation workflow setup using n8n + AI Agent</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-gray-700">Powered by Google Gemini AI</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-gray-700">No-code system with auto-posting</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-gray-700">Lifetime workflow access + onboarding support</span>
                </div>
              </div>
              <Button 
                className="w-full bg-purple-600 text-white sketch-button border-2 border-black hover:bg-purple-700 text-sm sm:text-base py-2 sm:py-3"
                onClick={() => window.open('https://topmate.io/muhammad_adnan10/1610387', '_blank')}
              >
                Get Your Workflow Delivered ⚡
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default PricingCalculator;
