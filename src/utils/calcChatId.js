export default function calcChatId(currentUserUid, otherUserUid) {
  return currentUserUid >= otherUserUid
		 ? currentUserUid + otherUserUid
		 : otherUserUid + currentUserUid
}