// export const formatDate = (isoDate: string): string => {
//     const date = new Date(isoDate);

//     const day = String(date.getDate()).padStart(2, '0');
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const year = date.getFullYear();

//     return `${day}-${month}-${year}`;
// }
export const formatDate = (isoDate: string): string => {
    const date = new Date(isoDate); // El objeto Date interpreta ISO como UTC

    const day = String(date.getUTCDate()).padStart(2, '0'); // Usar UTC para evitar desfases
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const year = date.getUTCFullYear();

    return `${day}-${month}-${year}`;
};

export const formatDateISO = (isoDate: string):string => {
    const partes = isoDate.split("-");
    const formatoISO = `${partes[2]}-${partes[1]}-${partes[0]}`; 
    
    return formatoISO;
}