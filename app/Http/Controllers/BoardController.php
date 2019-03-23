<?php

namespace App\Http\Controllers;

use App\Board;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;

class BoardController extends Controller
{
    public function index()
    {
        $boards = Board::with('user')->with('boardComments')->latest()->paginate(10);

        return response()->json([
            'boards' => $boards
        ]);
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'title' => 'required',
            'description' => 'required'
        ]);

        $board = new Board;
        if(Input::hasFile('thumnail'))
        {
            $thumbnail = Input::file('thumbnail');
            $newFileName = time().'-'.$thumbnail->getClientOriginalName();

            $thumbnail->move(stroage_path().'/files/',$newFileName);
            $board->thumbnail = $newFileName;
        }
        $request->user()->boards()->create([
            'title' => $request->title,
            'description' => $request->description
        ]);
    }

    public function show(Board $board)
    {
        $board->user;
        $boardComments = $board->boardComments()->with('user')->latest()->get();
        return response()->json([
            'board' => $board,
            'boardComments' => $boardComments
        ]);
    }

    public function edit(Board $board)
    {
        $board->user;
        return response()->json([
            'board' => $board
        ]);
    }

    public function update(Request $request, Board $board)
    {
        $this->validate($request, [
            'title' => 'required',
            'description' => 'required'
        ]);

        $input = $request->all();
        $board->update($input);
    }

    public function destroy(Board $board)
    {
        $board->delete();
    }
}
