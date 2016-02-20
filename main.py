from maze import Maze

def main():
    height = width = 5
    environment = Maze(width, height)
    environment.generate_maze()
    import pdb; pdb.set_trace()
    print environment

if __name__ == "__main__":
    main()
