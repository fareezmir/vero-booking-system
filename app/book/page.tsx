"use client";
import type { Physician, Slot } from "@prisma/client";
import { useState, useEffect } from "react";

export default function Book() {
    
    const [selectedPhysician, setSelectedPhysician] = useState<number | null>(null);
    const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        patientName: "",
        patientEmail: "",
        patientPhone: "",
        reasonForVisit: "",
    });

    const [physicians, setPhysicians] = useState<Physician[]>([]);
    const [slots, setSlots] = useState<Slot[]>([]);

}
