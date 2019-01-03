import random
def bfs(Adj, s): # Adj: adjacency list, s: starting vertex
  parent = {} # O(V) (use hash if unlabeled)
  parent[str(s[0])+","+str(s[1])] =  str(s[0])+","+str(s[1])# O(1) root
  level = [[str(s[0])+","+str(s[1])]] # O(1) initialize levels
  
  while 0 < len(level[-1]): # O(?) last level contains vertices
    level.append([]) # O(1) amortized, make new level
    for u in level[-2]: # O(?) loop over last full level
      
      for v in Adj[int(u.split(",")[0])][int(u.split(",")[1])]: # O(Adj[u]) loop over neighbors
        if str(v[0])+","+str(v[1]) not in parent: # O(1) parent not yet assigned
          parent[str(v[0])+","+str(v[1])] = u # O(1) assign parent from level[-2]
          level[-1].append(str(v[0])+","+str(v[1])) # O(1) amortized, add to border
  #print(parent)
  return parent
  
def unweighted_shortest_path(Adj, s, t):
  parent = bfs(Adj, s) # O(V + E) BFS tree from s
  if str(t[0])+","+str(t[1]) not in parent: # O(1) t reachable from s?
    return None # O(1) no path
  T = str(t[0])+","+str(t[1])
  S = str(s[0])+","+str(s[1])
  path = [T] # O(1) initialize path
  solve = []
  while(parent[T] is not T):
    solve+=[parent[T]]
    T=parent[T]
    
  solve.reverse()
  solve+=[str(t[0])+","+str(t[1])]
  return solve[1:]




maze = []

for i in range(10):
    maze+=[[]]
for i in range(10):
    for j in range(10):
        maze[i] +=[]
        
for i in maze:
    for j in range(10):
        i += [None]
for i in range(10):
    for j in range(10):
        
        if(random.random()<.2):
            maze[i][j] = 1
        else:
            maze[i][j] = 0
maze[0][0] = 0


adj = []
for i in range(10):
    adj+=[[]]
for i in range(10):
    for j in range(10):
        adj[i] +=[[]]


for i in range(10):
    for j in range(10):
        if(i+1<10 and maze[i+1][j] == 0 and maze[i][j] == 0):
            adj[i][j]+= [[i+1,j]]
        if(j+1<10 and maze[i][j+1] == 0 and maze[i][j] == 0):
            adj[i][j]+= [[i,j+1]]
            
        if(i-1>=0 and maze[i-1][j] == 0 and maze[i][j] == 0):
            adj[i][j]+= [[i-1,j]]
        if(j-1>=0 and maze[i][j-1]== 0 and maze[i][j] == 0):
            adj[i][j]+= [[i,j-1]]
    
for i in maze:
    print(i)

for i in maze:
    line = ""
    for j in i:
        if(j ==1):
            line+="#"
        else:
            line+="O"
    print(line)


solve = unweighted_shortest_path(adj,[0,0],[9,9])
print(solve)
for i in range(10):
    line = ""
    for j in range(10):
        if(maze[i][j] ==1):
            line+="#"
        else:
            if(solve is not None and str(i)+","+str(j) in solve):
                line+="X"
            else:
                line+="O"
    print(line)

print("finish")


