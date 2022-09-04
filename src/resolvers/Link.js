
function id(parent) { return parent.id }
function description(parent) { return parent.description }
function url(parent) { return parent.url }
function postedBy(parent, args, context) {
    return context.prisma.link.findUnique({ where: { id: parent.id } }).postedBy()
}
function votes(parent, args, context) {
    return context.prisma.link.findUnique({ where: { id: parent.id } }).votes()
  }
module.exports = {
    postedBy,
    votes,
}