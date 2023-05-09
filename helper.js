// Simple rendering functions used to have beautiful data on screen
function getOFFset(currentPage = 1, listPerPage){
    return (currentPage - 1) * [listPerPage];
}

function emptyOrRows(rows){
    if (!rows){
        return [];
    }
    return rows;
}

module.exports = {
    getOFFset,
    emptyOrRows
};