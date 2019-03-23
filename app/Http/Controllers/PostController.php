<?php

namespace App\Http\Controllers;

use App\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index(Request $request, Post $post)
    {
        $posts = Post::with('user')->latest()->get();

        return response()->json([
            'posts' => $posts
        ]);
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'description' => 'required'
        ]);

        $request->user()->posts()->create([
            'description' => $request->description
        ]);
    }

    public function show(Post $post)
    {
        //
    }

    public function edit(Post $post)
    {
        //
    }

    public function update(Request $request, Post $post)
    {
        //
    }

    public function destroy(Post $post)
    {
        $post->delete();
    }
}
