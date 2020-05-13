
export default class CommentAdapter {
  constructor(comment) {
    this.item = comment.id;
    this.smile = comment.emotion;
    this.user = comment.author;
    this.message = comment.comment;
    this.date = comment.date;
  }

  static parseComment(comment) {
    return new CommentAdapter(comment);
  }


}
