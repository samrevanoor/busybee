function sortByStageAsc(a, b) {
    const aStage = a.currentStage;
    const bStage = b.currentStage;

    if (aStage < bStage) return 1;
    if (aStage > bStage) return -1;

    return 0
};

function sortByStageDesc(a, b) {
    const aStage = a.currentStage;
    const bStage = b.currentStage;

    if (aStage < bStage) return -1;
    if (aStage > bStage) return 1;

    return 0
};

function sortByCreatedAsc(a, b) {
    const aDate = new Date(a.createdAt);
    const bDate = new Date(b.createdAt);

    if (aDate < bDate) return 1;
    if (aDate > bDate) return -1;

    return 0;
};


function sortByCreatedDesc(a, b) {
    const aDate = new Date(a.createdAt);
    const bDate = new Date(b.createdAt);

    if (aDate < bDate) return -1;
    if (aDate > bDate) return 1;

    return 0;
};

module.exports = {
    sortByCreatedAsc,
    sortByCreatedDesc,
    sortByStageAsc,
    sortByStageDesc
}