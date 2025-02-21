"use client";

import { MultiSelect } from "@/components/ui/multi-select";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const frameworksList = [
  { value: "alphabets", label: "Alphabets" },
  { value: "higher", label: "Highest Alphabet" },
  { value: "number", label: "Numbers" },
];

const formSchema = z.object({
  inputData: z.string().min(1, "Input cannot be empty"),
});

type ApiResponse = {
  numbers: number[];
  alphabets: string[];
  highest_alphabet: string[];
};

export default function Home() {
  const [responseData, setResponseData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { inputData: "" },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    setError(null);
    setResponseData(null);

    const response = await axios
      .post("/bfhl", values.inputData)
      .then((response) => {
        setResponseData(response.data);
      })
      .catch((error: any) => {
        setError(error.response?.data.message);
      })
      .finally(() => {
        setLoading(false);
      });

    console.log(response);
  };

  return (
    <div className="min-h-screen justify-center items-center w-full">
      <Card className="w-2/3 p-6 ">
        <h1 className="text-xl font-bold mb-4">Bajaj Finserv Health Limited</h1>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="inputData"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter Data</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter letters and numbers" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <MultiSelect
              options={frameworksList}
              onValueChange={setSelectedFilters}
              placeholder="Select Filters"
              variant="inverted"
              animation={2}
              maxCount={3}
            />

            <Button type="submit" disabled={loading}>
              {loading ? "Processing..." : "Submit"}
            </Button>
          </form>
        </Form>

        {error && <p className="text-red-500 mt-4">{error}</p>}

        {responseData && (
          <div className="mt-4 p-4 border rounded bg-gray-100">
            <h2 className="font-bold">Filtered Response:</h2>
            <ul className="list-disc pl-5">
              {selectedFilters.length === 0 && (
                <p>Please select a field to show.</p>
              )}
              {selectedFilters.includes("alphabets") && (
                <li>
                  <strong>Alphabets:</strong>{" "}
                  {responseData.alphabets?.join(", ") || "N/A"}
                </li>
              )}
              {selectedFilters.includes("higher") && (
                <li>
                  <strong>Highest Alphabet:</strong>{" "}
                  {responseData.highest_alphabet?.join(", ") || "N/A"}
                </li>
              )}
              {selectedFilters.includes("number") && (
                <li>
                  <strong>Numbers:</strong>{" "}
                  {responseData.numbers?.join(", ") || "N/A"}
                </li>
              )}
            </ul>
          </div>
        )}
      </Card>
    </div>
  );
}