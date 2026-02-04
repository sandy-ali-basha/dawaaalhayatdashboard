import { pharmaciesSeed } from "modules/pharmacies/data/pharmacies";

let pharmaciesData = [...pharmaciesSeed];

const toNumber = (value) => {
  const parsed = Number(value);
  return Number.isNaN(parsed) ? value : parsed;
};

const normalizePayload = (payload) => ({
  ...payload,
  lat: toNumber(payload?.lat),
  lng: toNumber(payload?.lng),
  hasProducts: payload?.hasProducts ?? true,
});

export const _Pharmacies = {
  list: async () => ({ data: pharmaciesData }),
  get: async (id) => ({
    data: pharmaciesData.find((pharmacy) => pharmacy.id === Number(id)),
  }),
  create: async (payload) => {
    const normalized = normalizePayload(payload);
    const nextId =
      pharmaciesData.reduce((max, item) => Math.max(max, item.id), 0) + 1;
    const created = { ...normalized, id: nextId };
    pharmaciesData = [...pharmaciesData, created];
    return { data: created };
  },
  update: async ({ id, payload }) => {
    const normalized = normalizePayload(payload);
    pharmaciesData = pharmaciesData.map((item) =>
      item.id === Number(id) ? { ...item, ...normalized } : item
    );
    return {
      data: pharmaciesData.find((pharmacy) => pharmacy.id === Number(id)),
    };
  },
  delete: async (id) => {
    pharmaciesData = pharmaciesData.filter(
      (pharmacy) => pharmacy.id !== Number(id)
    );
    return { data: { id: Number(id) } };
  },
};
