import { NextResponse } from "next/server";

export async function getUserinfo(username) {
  const url = `https://api.github.com/users/${encodeURIComponent(username)}`;
  const token = process.env.GITHUB_TOKEN;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/vnd.github.v3+json",
      Authorization: `token ${token}`,
    },
  });
  console.log(response);
  return response.ok;
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const user = searchParams.get("user") ?? "";
    const page = process.env.page || "";
    if (user === "") return NextResponse.json({ msg: "send some shit" });
    const data = await getUserinfo(user);
    return NextResponse.json({ status: 200, success: data });
  } catch (err) {
    console.error(err); // Log the error for debugging
    return NextResponse.json({
      success: false,
      message: "Error: Internal Error",
      ErrorMsg: err?.toString(),
    });
  }
}
