import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Sparkles, Zap, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Intro = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "AI-Powered Generation",
      description: "Transform your ideas into engaging tweets with advanced AI technology"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Lightning Fast",
      description: "Generate compelling content in seconds with our optimized algorithms"
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Engagement Focused",
      description: "Create tweets designed to maximize engagement and reach"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Navigation */}
      <nav className="flex justify-between items-center p-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg">
            <MessageSquare className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold text-white">XBot</span>
        </div>
        <Button 
          onClick={() => navigate("/post")}
          className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white border-0"
        >
          Post Now
        </Button>
      </nav>

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-6">
            Auto Generate your tweets
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Unleash the power of AI to create compelling, engaging tweets that resonate with your audience. 
            Transform your ideas into viral content with our advanced tweet generation platform.
          </p>
          <div className="mt-8 flex gap-4 justify-center">
            <Button 
              onClick={() => navigate("/post")}
              size="lg"
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white border-0 px-8 py-3 text-lg"
            >
              Start Creating
            </Button>
            
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          {features.map((feature, index) => (
            <Card key={index} className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-white">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        {/* <div className="mt-20 grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-cyan-400 mb-2">1K+</div>
            <div className="text-gray-400">Tweets Generated</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-400 mb-2">95%</div>
            <div className="text-gray-400">Engagement Rate</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-400 mb-2">24/7</div>
            <div className="text-gray-400">AI Availability</div>
          </div>
        </div>
        */}
      </div>
    </div>
  );
};

export default Intro; 