import { injectable } from "inversify";

@injectable()
class PostsClassifierService {
  constructor() {}

  /**
   * This service will call our ML model inference API
   * to classify whether the post is a spam or not
   */
  classifyPost(_: string, __: string) {
    return {
      isPossiblySensitive: false,
      isSpam: false,
      spamScore: 0,
    };
  }
}

export default PostsClassifierService;
