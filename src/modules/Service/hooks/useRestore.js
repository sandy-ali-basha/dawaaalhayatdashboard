import { _axios } from "interceptor/http-config";
import { useQueryClient, useMutation } from "react-query";

export const useRestore = ({ status, id }) => {
    const queryClient = useQueryClient();

    return useMutation(
        () => _axios.get(`/admin/service/restore/${id}`).then(() => {
            queryClient.invalidateQueries()
        })
    );
};
