export default function MetricBar({ label, value }) {
    return (
        <div className="mb-2">
            <span className="text-sm text-black" >{label}</span>
            <div className="w-full bg-gray-200 rounded h-2 mt-1">
                <div className="bg-blue-500 h-2 rounded" style={{ width: `${value}%` }} />
            </div>
        </div>
    );
}
