// Copyright (c) 2026 Northlatch Labs LLC. All rights reserved.
// Built-by: @projectx.sui · Co-authored-by: Claude
import { AddressChip } from '@/components/ui/AddressChip';
import { CHAIN_OBJECTS, explorerUrl } from '@/lib/chain';

export function AddressTable() {
  return (
    <ul className="grid gap-3">
      {CHAIN_OBJECTS.map((object) => (
        <li
          key={object.id}
          className="panel flex flex-col gap-3 p-5 md:flex-row md:items-center md:gap-6"
        >
          <div className="flex min-w-0 flex-col gap-1 md:w-64 md:shrink-0">
            <span className="font-display text-body font-medium text-white">{object.label}</span>
            <span className="label text-px-faint">
              {object.kind}
            </span>
          </div>
          <p className="flex-1 text-body text-px-muted">{object.note}</p>
          <AddressChip
            id={object.id}
            href={explorerUrl(object)}
            className="shrink-0 md:ml-auto"
          />
        </li>
      ))}
    </ul>
  );
}
