export const isLikedByUser = (requestUserId, post) => {
  for (let user of post.liked) if (requestUserId === user.id) return true;
  return false;
};
