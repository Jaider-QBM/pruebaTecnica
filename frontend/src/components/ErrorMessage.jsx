import { PointIcon } from "./icons/PointIcon";

export function ErrorMessage({ message }) {
    if (!message) {
        return null;
    }
    return (
        <div className="flex items-center mt-1">
            <PointIcon />
            <p className="text-red-500 text-sm">{message}</p>
        </div>
    )
}