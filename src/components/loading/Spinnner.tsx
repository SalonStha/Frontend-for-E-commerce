interface SpinnerProps {
    spinWidth?: number;
    size?: number;
    color?: string;
}
export const Spinner = ({
    spinWidth = 4,
    size = 10,
    color = "indigo-600"
}: SpinnerProps) => {
    const className = `w-${size} h-${size} border-${spinWidth} border-t-${color} border-r-${color} border-l-${color}`
    return (
        <>
            <div className={`rounded-full w-10 h-10 border-4
             border-t-gray-400
              border-r-gray-400
               border-l-gray-400 
               animate-spin ${className}`}>
            </div>
        </>
    )
}
