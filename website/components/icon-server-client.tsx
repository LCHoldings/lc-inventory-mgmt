"use client";

import dynamic from "next/dynamic";
import { LucideProps } from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";

interface IconProps extends LucideProps {
    name: keyof typeof dynamicIconImports;
}

const IconServerClient = ({ name, ...props }: IconProps) => {
    const LucideIcon = dynamic(dynamicIconImports[name]);

    return <LucideIcon {...props} />;
};

export default IconServerClient;
