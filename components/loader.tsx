import { Loader2 } from "lucide-react";

const loadingTexts = [
    "Counting the stars... almost there!",
    "Herding cats... just a sec",
    "Waiting for the internet to catch up...",
    "Spinning the hamster wheel...",
    "Summoning the data gods...",
    "Opening the portal to the internet...",
    "Polishing the pixels...",
    "Trying to remember where I put that file...",
    "Adjusting my magic wand...",
    "Warming up the servers...",
    "Reading the manual... again...",
    "Fighting off the bugs...",
    "Unlocking the secrets of the web...",
    "Tuning the matrix...",
    "Gathering all the files, one byte at a time...",
    "Recharging the brain cells...",
    "Aligning the stars for you...",
    "Spinning up a response... Hang tight!"
];


export default function Loader() {
    return (
        <div className="flex flex-col items-center justify-center w-full h-full space-y-2">
            <Loader2 className="h-12 w-12 animate-spin text-accent" />
            <p className="text-md text-muted-foreground font-medium italic">
                {loadingTexts[Math.floor(Math.random() * loadingTexts.length)]}
            </p>
        </div>
    );
}