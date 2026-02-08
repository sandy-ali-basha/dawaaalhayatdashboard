import { _axios } from "interceptor/http-config";

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

const unwrapPharmacyList = (response) =>
  response?.data?.pharmacies ?? response?.data ?? [];

const unwrapPharmacy = (response) =>
  response?.data?.pharmacy ?? response?.data ?? null;

export const _Pharmacies = {
  list: async () =>
    _axios.get("/pharmacies").then((res) => ({
      ...res.data,
      data: unwrapPharmacyList(res.data),
    })),
  get: async (id) =>
    _axios.get(`/pharmacies/${id}`).then((res) => ({
      ...res.data,
      data: unwrapPharmacy(res.data),
    })),
  create: async (payload) => {
    const normalized = normalizePayload(payload);
    return _axios.post("/pharmacies", normalized).then((res) => ({
      ...res.data,
      data: unwrapPharmacy(res.data),
    }));
  },
  update: async ({ id, payload }) => {
    const normalized = normalizePayload(payload);
    return _axios
      .put(`/pharmacies/${id}`, normalized)
      .then((res) => ({
        ...res.data,
        data: unwrapPharmacy(res.data),
      }));
  },
  delete: async (id) =>
    _axios.delete(`/pharmacies/${id}`).then((res) => ({
      ...res.data,
      data: unwrapPharmacy(res.data),
    })),
};
