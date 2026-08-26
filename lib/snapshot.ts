
import type { ProtocolSnapshot } from './types';
import snapshotJson from './snapshot.json';

export const SNAPSHOT = snapshotJson as unknown as ProtocolSnapshot;
