
const splitText = async (text) => {
    return await text.toLowerCase().replace(/[.,?!]/g, '').split(/\s+/)
}
export default splitText