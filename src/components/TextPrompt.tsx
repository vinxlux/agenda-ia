import React from 'react';

export default function TextPrompt({ texto, setTexto, onSubmit, logIa, mestreLog, agenda }: any) {
  return (
    <div className="flex flex-col lg:flex-row gap-4">
      <div className="flex-1 flex flex-col">
        <textarea
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          className="w-full p-3 border rounded text-base"
          style={{ height: 400, resize: 'none' }}
          placeholder="Descreva sua semana (ex: segunda academia 7h, terça inglês 19h)..."
        />
        <div className="flex gap-2 mt-2 items-center">
          <button onClick={onSubmit} className="bg-blue-600 text-white px-4 py-2 rounded">Gerar</button>
          <button
            onClick={() => {
              // build CSV and trigger download (Excel-compatible)
              try {
                const rows: string[] = [];
                // helper to strip diacritics and escape quotes
                const strip = (v: any) => {
                  if (v == null) return '';
                  const s = String(v).normalize('NFD').replace(/\p{Diacritic}/gu, '');
                  return s.replace(/"/g, '""');
                };

                // header without accents and without style columns
                rows.push(['Dia', 'Horario', 'Tarefa'].join(';'));
                Object.keys(agenda || {}).forEach((dia) => {
                  (agenda[dia] || []).forEach((t: any) => {
                    const diaNoAccent = strip(dia);
                    const horario = strip(t.horario || '');
                    const tarefa = strip(t.tarefa || '');
                    // wrap each field in quotes to be safe for Excel
                    rows.push([`"${diaNoAccent}"`, `"${horario}"`, `"${tarefa}"`].join(';'));
                  });
                });
                const csv = rows.join('\r\n');
                const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'agenda.csv';
                document.body.appendChild(a);
                a.click();
                a.remove();
                URL.revokeObjectURL(url);
              } catch (e) {
                console.error('Erro ao exportar CSV:', e);
              }
            }}
            className="bg-gray-600 text-white px-4 py-2 rounded"
          >
            Baixar Excel
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-4">
        <div className="bg-white border rounded p-3 text-base overflow-auto" style={{ height: 200 }}>
          <div className="font-bold mb-1 text-gray-700">Log da resposta da IA</div>
          <pre className="whitespace-pre-wrap break-all text-sm">{logIa || 'Nenhuma resposta ainda.'}</pre>
        </div>

        <div className="bg-white border rounded p-3 text-base overflow-auto" style={{ height: 180 }}>
          <div className="font-bold mb-1 text-gray-700">Log do mestre</div>
          <pre className="whitespace-pre-wrap break-all text-sm">{mestreLog || 'Nenhum registro do mestre ainda.'}</pre>
        </div>
      </div>
    </div>
  );
}
