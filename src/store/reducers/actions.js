export const AdoptionTypes = {
    ADOPT: "ADOPT",
    REMOVE: "REMOVE"
};

export function addToAdoptionList(bread) {
    return {
        type: AdoptionTypes.ADOPT,
        payload: { bread }
    };
}

export function removeFromAdoptionList(index) {
    return {
        type: AdoptionTypes.REMOVE,
        payload: { index }
    };
}