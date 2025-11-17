function TableAnswer({ table }) {
  if (!table) return null;

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-3">{table.title}</h3>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-gray-900 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-700">
              {table.headers.map((header, index) => (
                <th
                  key={index}
                  className="px-4 py-3 text-left text-sm font-semibold text-gray-200"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="border-t border-gray-700 hover:bg-gray-800 transition"
              >
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className="px-4 py-3 text-sm text-gray-300"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TableAnswer;