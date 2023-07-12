import { expect } from "chai";
import { getUserPosts, getPostUser, getPost } from "../requests.js";

describe("Testing the get requests to the posts db", function () {
  let user = "BrainCraver";
  let userObject = { user: "BrainCraver" };
  let userPosts = [
    {
      id: 10,
      user: "BrainCraver",
      title: "Still seeking brainsss",
      body: "Need more braaaaaaaaiiiinnnsss!",
      time: "2023-06-08 21:05:25",
    },
    {
      id: 7,
      user: "BrainCraver",
      title: "",
      body:
        "Braaaaiiiinnnnnssssss......................\r\n" +
        "braaaaaaaaaaaaaaaaaaaaaaiiiinnnnnssssss!",
      time: "2023-06-08 21:03:02",
    },
  ];
  let postID = 10;
  let postIDPost = {
    id: 10,
    user: "BrainCraver",
    title: "Still seeking brainsss",
    body: "Need more braaaaaaaaiiiinnnsss!",
    time: "2023-06-08 21:05:25",
  };

  it("Getting all of a user's posts", async function () {
    let userPosts = await getUserPosts(user);
    expect(userPosts).to.be.an("array");
    expect(userPosts).to.equal(userPosts);
  });
  it("Getting the user of a post given the ID", async function () {
    let user = await getPostUser(postID);
    expect(user).to.be.an("object");
    expect(user).to.deep.equal(userObject);
  });
  it("Get post given ID of post", async function () {
    let post = await getPost(postID);
    expect(post).to.be.an("object");
    expect(post).to.deep.equal(postIDPost);
  });
});
