import { useAddSupplier, useSupplierCodeCount } from "@renderer/hooks/useSuppliersQuery";
import { useForm } from "react-hook-form";
import { SupplierFormData } from "./contract";
import type { FC } from "react";
import { Button, CircularProgress, Grid } from "@mui/material";
import Input from "../Form/Input";

const SupplierForm: FC = () => {
    const addSupplier = useAddSupplier();

    const {
        control, 
        handleSubmit,
        formState: { errors },
        watch
    } = useForm<SupplierFormData>({
        mode: 'onChange',
        defaultValues: {
            supplierCode: '',
            supplierName: '',
            paymentTerms: '',
            paymentForm: '',
            notes: ''
        }
    });

    const { data: codeCount, isLoading: isCheckingCode } = useSupplierCodeCount(watch('supplierCode'));
    const isCodeExists = codeCount || 0 > 0;

    const onSubmit = async (data: SupplierFormData) => {
        const parsedSupplier = {
            supplierCode: data.supplierCode,
            supplierName: data.supplierName,
            notes: data.notes,
            payment: {
                paymentTerms: data.paymentTerms,
                paymentForm: data.paymentForm
            }
        };
        addSupplier.mutate(parsedSupplier);
        window.api.window.invalidateQueries('suppliers');
        window.api.window.closeNewSupplierWindow();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
            <Grid container spacing={2}>
                <Grid size={6}>
                    <Input
                        name="supplierCode"
                        control={control}
                        label="Codice Fornitore"
                        placeholder="Inserisci il codice fornitore"
                        required
                        error={errors.supplierCode}
                        fullWidth
                        rules={{
                            validate: () => !isCodeExists || 'Il codice fornitore esiste già',
                            pattern: {
                                value: /^[A-Za-z0-9-_]+$/,
                                message: 'Il codice fornitore può contenere solo lettere, numeri, trattini e underscore'
                            }
                        }}
                        endAdornment={isCheckingCode ? <CircularProgress size={24} /> : undefined}
                    />
                </Grid>
                <Grid size={6}/>
                <Grid size={8}>
                    <Input
                        name="supplierName"
                        control={control}
                        label="Nome Fornitore"
                        placeholder="Inserisci il nome fornitore"
                        required
                        error={errors.supplierName}
                        fullWidth
                    />
                </Grid>
                <Grid size={4}/>
                <Grid size={8}>
                    <Input
                        name="paymentForm"
                        control={control}
                        label="Forma di Pagamento"
                        placeholder="Inserisci la forma di pagamento"
                        error={errors.paymentForm}
                        fullWidth
                    />
                </Grid>
                <Grid size={4}>
                    <Input
                        name="paymentTerms"
                        control={control}
                        label="Termini di Pagamento"
                        placeholder="Inserisci i termini di pagamento"
                        error={errors.paymentTerms}
                        fullWidth
                    />
                </Grid>
                <Grid size={12}>
                    <Input
                        name="notes"
                        control={control}
                        label="Note"
                        placeholder="Inserisci eventuali note"
                        error={errors.notes}
                        fullWidth
                        multiline
                        rows={4}
                    />
                </Grid>
                <Grid size={6} />
                <Grid size={6}>
                    <Button type="submit" variant="contained" color="primary" fullWidth>Aggiungi Fornitore</Button>
                </Grid>
            </Grid>
        </form>
    );
}

export default SupplierForm;