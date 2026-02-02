import { BookImage } from 'lucide-react'
import { useState } from 'react'
import './Logo.css'

export const Logo = (props: React.SVGProps<SVGSVGElement>) => {
    const letters = ['P', 'U', 'R', 'R']
    const [animationKey, setAnimationKey] = useState(0)

    return (
        <svg
            viewBox="0 0 500 150"
            preserveAspectRatio="xMidYMid meet"
            onMouseEnter={() => setAnimationKey(prev => prev + 1)}
            aria-label="Picture Purrfect (Logo)"
            {...props}
        >
            <foreignObject x="0" y="0" width="500" height="150">
                <h1 className="text-6xl font-heading-cursive flex items-center">
                    <BookImage aria-label="Picture" className="size-30 animate-wobble -mr-2" />
                    <span className="text-8xl font-heading-chunky inline-flex tracking-tighter">
                        {letters.map((letter, index) => (
                            <span
                                key={`${animationKey}-${index}`}
                                className="inline-block animate-letter-twist"
                                style={{ '--twist-delay': `${index * 0.2}s` } as React.CSSProperties}
                            >
                                {letter}
                            </span>
                        ))}
                    </span>
                    fect
                </h1>
            </foreignObject>
        </svg>
    )
}
