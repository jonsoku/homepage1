<?php

namespace App\Http\Controllers;

use App\Youtube;
use Illuminate\Http\Request;

class YoutubeController extends Controller
{
    public function index(Request $request, Youtube $youtube)
    {
        $youtubes = Youtube::with('user')->latest()->paginate(4);

        return response()->json([
            'youtubes' => $youtubes
        ]);
    }


    public function store(Request $request)
    {
        $this->validate($request, [
            'title' => 'required',
            'url' => 'required',
            'description' => 'required'
        ]);

        $request->user()->youtubes()->create([
            'title' => $request->title,
            'url' => $request->url,
            'description' => $request->description
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Youtube  $youtube
     * @return \Illuminate\Http\Response
     */
    public function show(Youtube $youtube)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Youtube  $youtube
     * @return \Illuminate\Http\Response
     */
    public function edit(Youtube $youtube)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Youtube  $youtube
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Youtube $youtube)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Youtube  $youtube
     * @return \Illuminate\Http\Response
     */
    public function destroy(Youtube $youtube)
    {
        $youtube->delete();
    }
}
