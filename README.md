# Year-wise performance comparison of match winners

If the players on an average make similar fast serves in the matches for a particular year, how similar, or how different they averagely perform on service and match metrics against each other? Standard deviations are a good way to see the distance to the mean for a particular metric in each subgroup. However, if I want to see the performance comparison between any two players on their average performance, it’s hard to deduce the comparison based on hardline SD number. I was interested in looking at this question visually, so I came up with the visualization to be described shortly afterwards.

I have omitted the rows consisting of missing data, as for most of those rows, the data relation to fast serve, average first and second serve were missing, and imputing with average values by each player might not be accurate, especially in case where’s only one row is there for a player and the data is missing in that row.

In order to browse through each of the years’ data, I made the use of time slider. If you click at the the particular year, you can retrieve the match winners’ details pertaining to that year. For each year, I have computed the average service and match performance metrics for a particular player. Now, in order to see how similar are players are based on their average fast serve speed for that particular year, I have first normalized the average fast serve speed in the range of 0 to 1. Then, I computed pairwise Euclidean distances for each player, with respect to all the other players. The players are categorized into extremely similar, similar, different, very different or extremely different to each other, for each player.

If I click at a particular player node, that circle will come to the center of circle, and all the other players will get arranged in the categories I mentioned above. On the top left corner, the selected player’s name and fast serve speed in KPH will be shown. On the right side, the selected player’s average service and match performance metrics will be shown. Now, if I hover over other player node, his name and average fast serve will be shown on top of the node. And, on the right side, the hovered player’s average service and match performance metrics will be represented by a black vertical line, which is used to compare with stats of the selected player. Hovering over the bars will show the exact number, if not understood by ticks.

In the service performance fast serve, average first and second serve is shown in Kilometer per hour. In match performance metrics, the first/second, break, return and net point are shown in percentage. If we hover for the player and his similar players, we see a general trend that their average first serve and average second serve speeds tend to be somewhat similar as well, but they contrast a lot in match performance metrics. This is just a generalized observation, and exceptions do exist for this observation.
