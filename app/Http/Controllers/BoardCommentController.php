<?php

namespace App\Http\Controllers;

use App\BoardComment;
use Illuminate\Http\Request;
use App\Board;

class BoardCommentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, Board $board)
    {
        $this->validate($request, [
            'body' => 'required | min:3 | max:1000',
        ]);
        $user = $request->user();
        $user->boardComments()->create(array_merge(
            $request->all(),
            ['board_id' => $board->id]
        ));

        return redirect(route('boards.show', $board->id));

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\BoardComment  $boardComment
     * @return \Illuminate\Http\Response
     */
    public function show(BoardComment $boardComment)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\BoardComment  $boardComment
     * @return \Illuminate\Http\Response
     */
    public function edit(BoardComment $boardComment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\BoardComment  $boardComment
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, BoardComment $boardComment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\BoardComment  $boardComment
     * @return \Illuminate\Http\Response
     */
    public function destroy(BoardComment $boardComment)
    {
        //
    }
}
