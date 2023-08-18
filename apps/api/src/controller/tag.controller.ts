import { Tag } from "@entities";
import { Controller, requestHandler } from "@helpers";

export class TagController extends Controller<Tag> {
  constructor() {
    super(Tag);
  }

  getTags = requestHandler(async (req, res) => {
    res.status(200).json(await this.repository.find());
  });
}
