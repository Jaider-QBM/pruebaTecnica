export function FormError({ message }) {
    if (!message) {
        return null;
    }
    return (
        <p className="text-red-700 bg-red-200 p-2 border-4 rounded-lg my-3">
            {message}
        </p>
    )
}