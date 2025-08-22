"use client";

import "./../app/app.css";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import VisitorCounter from "./components/VisitorCounter";

Amplify.configure(outputs);

export default function App() {
  return (
    <main>
      <div className="visitor-counter-container">
        <VisitorCounter />
      </div>
    </main>
  );
}
